package com.ssafy.memetionary.wordes.repository;

import co.elastic.clients.elasticsearch.ElasticsearchClient;
import co.elastic.clients.elasticsearch._types.SortOrder;
import co.elastic.clients.elasticsearch._types.query_dsl.Query;
import co.elastic.clients.elasticsearch.core.SearchResponse;
import co.elastic.clients.elasticsearch.core.search.SourceConfig;
import co.elastic.clients.json.JsonData;
import com.nimbusds.jose.shaded.gson.JsonElement;
import com.nimbusds.jose.shaded.gson.JsonParser;
import com.ssafy.memetionary.common.CustomErrorType;
import com.ssafy.memetionary.common.exception.QueryNotFoundException;
import com.ssafy.memetionary.common.exception.WordAutoCompleteException;
import com.ssafy.memetionary.util.WordUtils;
import com.ssafy.memetionary.wordes.document.QueryType;
import com.ssafy.memetionary.wordes.document.SearchFieldType;
import com.ssafy.memetionary.wordes.document.WordES;
import com.ssafy.memetionary.wordes.document.WordESRequestType;
import com.ssafy.memetionary.wordes.document.WordESType;
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
    private final WordUtils wordUtils;

    public WordESRepositoryImpl(ElasticsearchClient client, WordUtils wordUtils) {
        this.client = client;
        this.wordUtils = wordUtils;
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
                            .includes(List.of(WordESType.NAME.getFieldName(), WordESType.DESCRIPTION.getFieldName()))
                        )
                    ))
                    .query(q -> q
                        .bool(b -> b
                            .should(sh -> sh
                                .match(m -> m
                                    .field("name.jaso")
                                    .query(word)
                                    .analyzer("suggest_index_analyzer")
                                    .fuzziness("1")
                                )
                            )
                            .should(sh -> sh
                                .match(m -> m
                                    .field("noriName.jaso")
                                    .query(wordUtils.getNoriResult(word))
                                    .analyzer("suggest_index_analyzer")
                                )
                            )
                        )
                    )
                , Object.class
            );

            log.debug("response = " + response);

            double maxScore = response.hits().maxScore();
            log.debug(maxScore + "");

            List<WordESAutoCompleteItem> wordESAutoCompleteItems = response.hits().hits().stream()
//                .filter(hit -> hit.score() >= 20)
                .map(hit -> {
                    Map<String, String> result = (Map<String, String>) hit.source();
                    return WordESAutoCompleteItem.builder()
                        .name(result.get(WordESType.NAME.getFieldName()))
                        .description(result.get(WordESType.DESCRIPTION.getFieldName()))
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
    public WordESSearchResponse searchWords(QueryType queryType, SearchFieldType fieldType,
                                            String word, String clientIP, Pageable pageable) {
        List<WordESSearchItem> words = new ArrayList<>();
        long total;
        try {
            assert client != null;

            SearchResponse<Object> response = client.search(s -> s
                    .index(INDEX)
                    .from(pageable.getPageNumber() * pageable.getPageSize())
                    .size(pageable.getPageSize())
                    .source(SourceConfig.of(sc -> sc
                        .filter(f -> f
                            .includes(
                                List.of(
                                    WordESType.NAME.getFieldName(), WordESType.DESCRIPTION.getFieldName(),
                                    WordESType.EXAMPLE.getFieldName(), WordESType.MEMBER_NICKNAME.getFieldName(),
                                    WordESType.CREATE_DATE.getFieldName(), WordESType.HASHTAGS.getFieldName(),
                                    WordESType.LIKE_COUNT.getFieldName(), WordESType.DISLIKE_COUNT.getFieldName()
                                )
                            )
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
                    .sort(sort -> sort
                        .field(f -> f
                            .field(WordESType.CREATE_DATE.getFieldName())
                            .order(SortOrder.Desc)
                        )
                    )
                , Object.class
            );

            return getWordESSearchResponse(response, clientIP);

        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public WordESSearchResponse searchWordIndex(String name, Pageable pageable, String clientIP) {
        try {
            SearchResponse<Object> response = client.search(s -> s
                    .index(INDEX)
                    .from(pageable.getPageNumber() * pageable.getPageSize())
                    .size(pageable.getPageSize())
                    .source(SourceConfig.of(sc -> sc
                        .filter(f -> f
                            .includes(
                                List.of(
                                    WordESType.NAME.getFieldName(), WordESType.DESCRIPTION.getFieldName(),
                                    WordESType.EXAMPLE.getFieldName(), WordESType.MEMBER_NICKNAME.getFieldName(),
                                    WordESType.CREATE_DATE.getFieldName(), WordESType.HASHTAGS.getFieldName(),
                                    WordESType.LIKE_COUNT.getFieldName(), WordESType.DISLIKE_COUNT.getFieldName()
                                )
                            )
                        )
                    ))
                    .query(Query.of(q -> q
                        .prefix(p -> p
                            .field(WordESType.NAME_CHOSUNG.getFieldName())
                            .value(name)
                        )
                    ))
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

            return getWordESSearchResponse(response, clientIP);

        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public WordESSearchResponse searchWordById(String wordId, String clientIP) {
        log.debug("wordId = " + wordId);
        try {
            assert client != null;

            SearchResponse<Object> response = client.search(s -> s
                    .index(INDEX)
                    .source(SourceConfig.of(sc -> sc
                        .filter(f -> f
                            .includes(
                                List.of(
                                    WordESType.NAME.getFieldName(), WordESType.DESCRIPTION.getFieldName(),
                                    WordESType.EXAMPLE.getFieldName(), WordESType.MEMBER_NICKNAME.getFieldName(),
                                    WordESType.CREATE_DATE.getFieldName(), WordESType.HASHTAGS.getFieldName(),
                                    WordESType.LIKE_COUNT.getFieldName(), WordESType.DISLIKE_COUNT.getFieldName()
                                )
                            )
                        )
                    ))
                    .query(
                        makeQuery(QueryType.MATCH, SearchFieldType.ID, wordId)
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

            return getWordESSearchResponse(response, clientIP);
        } catch (Exception e) {
            throw new RuntimeException();
        }
    }

    private WordESSearchResponse getWordESSearchResponse(SearchResponse<Object> response, String clientIP) {
        long total = response.hits().total().value();
        log.debug(total + "");

        List<WordESSearchItem> wordESSearchItems = response.hits().hits().stream()
            .map(hits -> {
                Map<String, Object> sourceMap = (Map<String, Object>) hits.source();
                log.debug(sourceMap.toString());
                log.debug((String) sourceMap.get(WordESType.NAME.getFieldName()));
                Map<?, ?> fieldMap = hits.fields();

                JsonElement likeElement = JsonParser.parseString(fieldMap.get(WordESType.HAS_LIKE.getFieldName()).toString());
                JsonElement dislikeElement = JsonParser.parseString(fieldMap.get(WordESType.HAS_DISLIKE.getFieldName()).toString());
                JsonElement isWriterElement = JsonParser.parseString(fieldMap.get(WordESType.IS_WRITER.getFieldName()).toString());

                boolean hasLike = likeElement.getAsJsonArray().get(0).getAsBoolean();
                boolean hasDislike = dislikeElement.getAsJsonArray().get(0).getAsBoolean();
                boolean isWriter = isWriterElement.getAsJsonArray().get(0).getAsBoolean();

                return WordESSearchItem.builder()
                    .id(hits.id())
                    .wordName((String) sourceMap.get(WordESType.NAME.getFieldName()))
                    .wordDescription((String) sourceMap.get(WordESType.DESCRIPTION.getFieldName()))
                    .wordExample((String) sourceMap.get(WordESType.EXAMPLE.getFieldName()))
                    .createDate(LocalDateTime.parse((String) sourceMap.get(WordESType.CREATE_DATE.getFieldName())))
                    .memberNickname((String) sourceMap.get(WordESType.MEMBER_NICKNAME.getFieldName()))
                    .hashtagList((List<String>) sourceMap.get(WordESType.HASHTAGS.getFieldName()))
                    .likeCount(((Number) sourceMap.get(WordESType.LIKE_COUNT.getFieldName())).longValue())
                    .dislikeCount(((Number) sourceMap.get(WordESType.DISLIKE_COUNT.getFieldName())).longValue())
                    .hasLike(hasLike)
                    .hasDislike(hasDislike)
                    .isWriter(isWriter)
                    .clientIP(clientIP)
                    .build();
            }).toList();

        return WordESSearchResponse.builder()
            .total(total)
            .words(wordESSearchItems)
            .build();
    }

    private Query makeQuery(QueryType queryType, SearchFieldType fieldType, String name) {
        if (queryType.getFieldName().equals(QueryType.MATCH.getFieldName())) {
            return matchQuery(fieldType, name);
        }
        if (queryType.getFieldName().equals(QueryType.TERM.getFieldName())) {
            return termQuery(fieldType, name);
        }
        if (queryType.getFieldName().equals(QueryType.MATCH_ALL.getFieldName())) {
            return Query.of(q -> q
                .matchAll(ma -> ma));
        }
        throw new QueryNotFoundException(queryType + "인 쿼리가 없습니다.");
    }

    private Query matchQuery(SearchFieldType fieldType, String name) {
        return Query.of(q -> q
            .match(m -> m
                .field(fieldType.getFieldName())
                .query(name)
            ));
    }

    private Query termQuery(SearchFieldType fieldType, String name) {
        return Query.of(q -> q
            .term(t -> t
                .field(fieldType.getFieldName())
                .value(name)
            ));
    }
}
