package com.ssafy.memetionary.wordes.repository;

import co.elastic.clients.elasticsearch.ElasticsearchClient;
import co.elastic.clients.elasticsearch._types.query_dsl.Operator;
import co.elastic.clients.elasticsearch._types.query_dsl.Query;
import co.elastic.clients.elasticsearch.core.SearchResponse;
import co.elastic.clients.elasticsearch.core.search.SourceConfig;
import co.elastic.clients.json.JsonData;
import com.nimbusds.jose.shaded.gson.JsonElement;
import com.nimbusds.jose.shaded.gson.JsonParser;
import com.ssafy.memetionary.common.CustomErrorType;
import com.ssafy.memetionary.common.exception.QueryNotFoundException;
import com.ssafy.memetionary.common.exception.WordAutoCompleteException;
import com.ssafy.memetionary.common.exception.WordNotFoundException;
import com.ssafy.memetionary.wordes.document.SearchFieldType;
import com.ssafy.memetionary.wordes.document.WordES;
import com.ssafy.memetionary.wordes.document.WordESRequestType;
import com.ssafy.memetionary.wordes.dto.WordESAutoCompleteItem;
import com.ssafy.memetionary.wordes.dto.WordESAutoCompleteResponse;
import com.ssafy.memetionary.wordes.dto.WordESSearchItem;
import com.ssafy.memetionary.wordes.dto.WordESSearchResponse;
import java.io.IOException;
import java.time.LocalDateTime;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import org.springframework.data.domain.Pageable;

@Slf4j
public class WordESRepositoryImpl implements WordESRepositoryCustom {

    @Value("#{@esConfig.getWordIndexName()}")
    private String INDEX;
    private final ElasticsearchClient client;

    public WordESRepositoryImpl(ElasticsearchClient client) {
        this.client = client;
    }

    @Override
    public void updateLike(WordESRequestType wordESRequestType, WordES wordES, String clientIP) {

        String id = wordES.getId();

        String query = wordESRequestType.getQuery();

        try {
            assert client != null;
            client.update(u -> u
                    .index(INDEX)
                    .id(id)
                    .script(script -> script
                        .inline(inlineScript -> inlineScript
                            .lang("painless")
                            .source(query)
                            .params("ip", JsonData.of(clientIP))
                        )),
                WordES.class
            );
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public WordESAutoCompleteResponse getAutoCompleteWords(String word) {
        try {
            assert client != null;

            SearchResponse<Object> response = client.search(s -> s
                    .index(INDEX)
                    .size(10)
                    .source(SourceConfig.of(sc -> sc
                        .filter(f -> f
                            .includes(List.of("name", "description"))
                        )
                    ))
                    .query(q -> q
                        .multiMatch(mm -> mm
                            .query(word)
                            .fields(List.of("name^10", "name.ngram^3", "name.jaso"))
                            .operator(Operator.And)
                            .prefixLength(3)
                        )
                    )
                , Object.class
            );

            log.debug("response = " + response);

            double maxScore = response.hits().maxScore();
            log.debug(maxScore + "");

            List<WordESAutoCompleteItem> wordESAutoCompleteItems = response.hits().hits().stream()
                .filter(hit -> hit.score() >= maxScore / 5)
                .map(hit -> {
                    Map<String, String> result = (Map<String, String>) hit.source();
                    log.debug(hit.source().getClass().toString());
                    log.debug(result.get("name"));
                    log.debug(result.get("description"));
                    log.debug(hit.score() + "");
                    return WordESAutoCompleteItem.builder()
                        .name(result.get("name"))
                        .description(result.get("description"))
                        .build();
                }).toList();
            log.debug("wordESAutoCompleteItems = " + wordESAutoCompleteItems);

            return WordESAutoCompleteResponse.builder()
                .words(wordESAutoCompleteItems)
                .build();

        } catch (Exception e) {
            e.printStackTrace();
            throw new WordAutoCompleteException(
                CustomErrorType.WORD_AUTO_COMPLETE_FAIL.getMessage());
        }
    }

    @Override
    public WordESSearchResponse searchWords(String queryType, SearchFieldType fieldType,
        String word,
        String clientIP, Pageable pageable) {
        List<WordESSearchItem> words = new ArrayList<>();
        long total;
        try {
            assert client != null;

            SearchResponse<Object> response = client.search(s -> s
                    .index("word")
                    .from(pageable.getPageNumber())
                    .size(10)
                    .source(SourceConfig.of(sc -> sc
                        .filter(f -> f
                            .includes(List.of("name", "description", "example", "memberNickname",
                                "createDate", "hashtags", "likeCount", "dislikeCount"))
                        )
                    ))
                    .query(
                        makeQuery(queryType, fieldType, word)
                    )
                    .scriptFields("has_like", sf -> sf
                        .script(sc -> sc
                            .inline(i -> i
                                .source("doc['likes'].contains(params.ip)")
                                .params("ip", JsonData.of(clientIP))
                            )
                        )
                    )
                    .scriptFields("has_dislike", sf -> sf
                        .script(sc -> sc
                            .inline(i -> i
                                .source("doc['dislikes'].contains(params.ip)")
                                .params("ip", JsonData.of(clientIP))
                            )
                        )
                    )
                    .scriptFields("is_writer", sf -> sf
                        .script(sc -> sc
                            .inline(i -> i
                                .source("doc['memberId'].value == params.ip")
                                .params("ip", JsonData.of(clientIP))
                            )
                        )
                    )
                , Object.class
            );

            total = response.hits().total().value();
            response.hits().hits().stream()
                .forEach(hit -> {
                    String id = hit.id();
                    // Source 처리
                    Map<?, ?> sourceMap = (Map<?, ?>) hit.source();
                    log.debug("sourceMap = " + sourceMap);
                    log.debug(sourceMap.getClass().toString());
                    WordESSearchItem wordESSearchItem = null;
                    if (sourceMap instanceof Map<?, ?>) {
                        String name = (String) (sourceMap).get("name");
//                        log.debug("name = " + name);
                        String description = (String) (sourceMap).get("description");
//                        log.debug("description = " + description);
                        String example = (String) (sourceMap).get("example");
//                        log.debug("example = " + example);
                        String memberNickname = (String) (sourceMap).get(
                            "memberNickname");
//                        log.debug("memberNickname = " + memberNickname);
                        String createDate = (String) (sourceMap).get("createDate");
                        LocalDateTime localDateTime = LocalDateTime.parse(createDate);
//                        log.debug("createDate = " + createDate);
                        List<String> hashtags = (List<String>) (sourceMap).get(
                            "hashtags");
//                        log.debug("hashtags = " + hashtags);
                        long likecount = ((Number) sourceMap.get("likeCount")).longValue();
                        log.debug("likecount = " + likecount);
                        long dislikecount = ((Number) sourceMap.get("dislikeCount")).longValue();
                        log.debug("dislikecount = " + dislikecount);

                        Map<?, ?> fieldMap = hit.fields();
                        JsonElement likeElement = JsonParser.parseString(
                            fieldMap.get("has_like").toString());
                        JsonElement dislikeElement = JsonParser.parseString(
                            fieldMap.get("has_dislike").toString());
                        JsonElement isWriterElement = JsonParser.parseString(
                            fieldMap.get("is_writer").toString());

                        boolean hasLike = likeElement.getAsJsonArray().get(0).getAsBoolean();
                        boolean hasDislike = dislikeElement.getAsJsonArray().get(0).getAsBoolean();
                        boolean isWriter = isWriterElement.getAsJsonArray().get(0).getAsBoolean();

                        wordESSearchItem = WordESSearchItem.builder()
                            .id(id)
                            .wordName(name)
                            .wordDescription(description)
                            .wordExample(example)
                            .createDate(localDateTime)
                            .memberNickname(memberNickname)
                            .hashtagList(hashtags)
                            .likeCount(likecount)
                            .dislikeCount(dislikecount)
                            .hasLike(hasLike)
                            .hasDislike(hasDislike)
                            .isWriter(isWriter)
                            .build();
                        words.add(wordESSearchItem);
//                        log.debug(words.toString());
                    }
                });

        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        WordESSearchResponse wordESSearchResponse = WordESSearchResponse.builder()
            .words(words)
            .total(total)
            .build();
        return wordESSearchResponse;
    }

    private final Query makeQuery(String queryType, SearchFieldType fieldType, String name) {
        if (queryType.equals("match")) {
            return matchQuery(fieldType, name);
        }
        if (queryType.equals("term")) {
            return termQuery(fieldType, name);
        }
        if(queryType.equals("matchAll")){
            return  Query.of(q -> q
                .matchAll(ma -> ma));
        }
        throw new QueryNotFoundException(queryType + "인 쿼리가 없습니다.");
    }

    private final Query matchQuery(SearchFieldType fieldType, String name) {
        return Query.of(q -> q
            .match(m -> m
                .field(fieldType.getFieldName())
                .query(name)
            ));
    }

    private final Query termQuery(SearchFieldType fieldType, String name) {
        return Query.of(q -> q
            .term(t -> t
                .field(fieldType.getFieldName())
                .value(name)
            ));
    }
}
