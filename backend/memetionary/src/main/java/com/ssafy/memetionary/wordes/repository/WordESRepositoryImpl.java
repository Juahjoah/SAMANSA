package com.ssafy.memetionary.wordes.repository;

import co.elastic.clients.elasticsearch.ElasticsearchClient;
import co.elastic.clients.json.JsonData;
import com.ssafy.memetionary.wordes.document.WordES;
import com.ssafy.memetionary.wordes.document.WordESRequestType;
import lombok.extern.slf4j.Slf4j;

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

}
