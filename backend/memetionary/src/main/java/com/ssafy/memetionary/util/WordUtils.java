package com.ssafy.memetionary.util;

import co.elastic.clients.elasticsearch.ElasticsearchClient;
import co.elastic.clients.elasticsearch.indices.AnalyzeRequest;
import co.elastic.clients.elasticsearch.indices.AnalyzeResponse;
import co.elastic.clients.elasticsearch.indices.analyze.AnalyzeToken;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class WordUtils {

    private final ElasticsearchClient client;

    public WordUtils(ElasticsearchClient client) {
        this.client = client;
    }

    public String getNoriResult(String name) {
        try {
            StringBuilder sb = new StringBuilder();

            AnalyzeRequest analyzeRequest = new AnalyzeRequest.Builder()
                .index("word")
                .analyzer("nori")
                .text(name)
                .build();
            AnalyzeResponse response = client.indices().analyze(analyzeRequest);
            List<AnalyzeToken> tokens = response.tokens();

            for (AnalyzeToken token : tokens) {
                sb.append(token.token()).append(' ');
            }
            return sb.toString().trim();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }
}
