package com.ssafy.memetionary.wordes.repository;

import co.elastic.clients.elasticsearch.ElasticsearchClient;
import co.elastic.clients.elasticsearch.core.SearchResponse;
import co.elastic.clients.elasticsearch.core.search.Hit;
import co.elastic.clients.elasticsearch.core.search.SourceConfig;
import co.elastic.clients.json.JsonData;
import com.nimbusds.jose.shaded.gson.JsonArray;
import com.nimbusds.jose.shaded.gson.JsonElement;
import com.nimbusds.jose.shaded.gson.JsonObject;
import com.nimbusds.jose.shaded.gson.JsonParser;
import com.ssafy.memetionary.wordes.document.WordES;
import com.ssafy.memetionary.wordes.document.WordESRequestType;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

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
    public List<String> getAutoCompleteWords(String word) {
        List<String> words = null;
        try {
            assert client != null;

            SearchResponse<Object> response = client.search(s -> s
                    .index(INDEX)
                    .size(10)
                    .source(SourceConfig.of(sc -> sc
                        .filter(f -> f
                            .includes(List.of("name", "description", "example"))
                        )
                    ))
                    .query(q -> q
                        .match(m -> m
                            .field("name")
                            .query(word)
                        )
                    )
                , Object.class
            );

            log.debug("response = " + response);

            List<Object> tmp = response.hits().hits().stream().map(Hit::source)
                .map(sourceMap -> {
                    log.debug("sourceMap = " + sourceMap);
                    log.debug(sourceMap.getClass().toString());
                    if(sourceMap instanceof Map<?,?>){
                        String name = (String)((Map<?, ?>) sourceMap).get("name");
                        log.debug("name = " + name);
                        String description = (String)((Map<?, ?>) sourceMap).get("description");
                        log.debug("description = " + description);

                        String example = (String)((Map<?, ?>) sourceMap).get("example");
                        log.debug("example = " + example);
                    }
                    return sourceMap;
                }).toList();


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

}
