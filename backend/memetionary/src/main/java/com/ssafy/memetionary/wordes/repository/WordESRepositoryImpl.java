package com.ssafy.memetionary.wordes.repository;

import co.elastic.clients.elasticsearch.ElasticsearchClient;
import co.elastic.clients.elasticsearch._types.query_dsl.Operator;
import co.elastic.clients.elasticsearch.core.SearchResponse;
import co.elastic.clients.elasticsearch.core.search.SourceConfig;
import co.elastic.clients.json.JsonData;
import com.ssafy.memetionary.common.CustomErrorType;
import com.ssafy.memetionary.common.exception.WordAutoCompleteException;
import com.ssafy.memetionary.wordes.document.WordES;
import com.ssafy.memetionary.wordes.document.WordESRequestType;
import com.ssafy.memetionary.wordes.dto.WordESAutoCompleteItem;
import com.ssafy.memetionary.wordes.dto.WordESAutoCompleteResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;

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
            throw new WordAutoCompleteException(CustomErrorType.WORD_AUTO_COMPLETE_FAIL.getMessage());
        }
    }

}
