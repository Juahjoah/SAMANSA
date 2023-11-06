package com.ssafy.memetionary.wordes.repository;

import co.elastic.clients.elasticsearch.ElasticsearchClient;
import co.elastic.clients.elasticsearch.core.SearchResponse;
import co.elastic.clients.elasticsearch.core.search.SourceConfig;
import co.elastic.clients.json.JsonData;
import com.nimbusds.jose.shaded.gson.JsonArray;
import com.nimbusds.jose.shaded.gson.JsonElement;
import com.nimbusds.jose.shaded.gson.JsonObject;
import com.nimbusds.jose.shaded.gson.JsonParser;
import com.ssafy.memetionary.wordes.document.WordES;
import com.ssafy.memetionary.wordes.document.WordESRequestType;
import com.ssafy.memetionary.wordes.dto.WordESSearchItem;
import com.ssafy.memetionary.wordes.dto.WordESSearchResponse;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.Map;
import lombok.extern.slf4j.Slf4j;

import java.util.ArrayList;
import java.util.List;
import org.springframework.data.domain.Pageable;

@Slf4j
public class WordESRepositoryImpl implements WordESRepositoryCustom {

    final String INDEX = "word";
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
    public List<String> getAutoCompleteWords(String word) {
        List<String> words = null;
        try {
            assert client != null;

            words = new ArrayList<>();
            String clientResponse = client.search(s -> s
                    .index(INDEX)
                    .size(50)
                    .query(q -> q
                        .bool(b -> b
                            .should(sh -> sh
                                .prefix(p -> p
                                    .field("name")
                                    .value(word)
                                    .boost(2.0f)
                                )
                            )
                            .should(sh -> sh
                                .match(m -> m
                                    .field("name")
                                    .query(word)
                                )
                            )
                        )
                    )
                    .source(SourceConfig.of(sc -> sc
                        .filter(f -> f
                            .includes(List.of("name"))
                        )
                    ))
                ,
                Object.class
            ).toString();

            clientResponse = clientResponse.substring(16);
            log.debug(clientResponse);

            JsonElement jsonElement = JsonParser.parseString(clientResponse);
            JsonArray hits = jsonElement.getAsJsonObject()
                .getAsJsonObject("hits")
                .getAsJsonArray("hits");
            log.debug(hits.toString());

            for (JsonElement hitElement : hits) {
                JsonObject hitObject = hitElement.getAsJsonObject();
                String sourceStr = hitObject.getAsJsonPrimitive("_source").getAsString();
                int startIndex = sourceStr.indexOf("=") + 1;
                int endIndex = sourceStr.indexOf("}");
                String name = sourceStr.substring(startIndex, endIndex);
                log.debug(name);
                words.add(name);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return words;
    }

    @Override
    public WordESSearchResponse searchWords(String word, String clientIP, Pageable pageable) {
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
                                "createDate", "hashtags"))
                        )
                    ))
                    .query(q -> q
                        .match(m -> m
                            .field("name")
                            .query(word)
                        )
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
//                    log.debug("sourceMap = " + sourceMap);
//                    log.debug(sourceMap.getClass().toString());
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


}
