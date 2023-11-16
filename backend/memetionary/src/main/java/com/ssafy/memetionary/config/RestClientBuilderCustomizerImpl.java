package com.ssafy.memetionary.config;

import java.security.KeyManagementException;
import java.security.KeyStoreException;
import java.security.NoSuchAlgorithmException;

import org.apache.http.conn.ssl.NoopHostnameVerifier;
import org.apache.http.impl.nio.client.HttpAsyncClientBuilder;
import org.apache.http.ssl.SSLContextBuilder;
import org.apache.http.ssl.SSLContexts;
import org.elasticsearch.client.RestClientBuilder;
import org.springframework.boot.autoconfigure.elasticsearch.RestClientBuilderCustomizer;
import org.springframework.stereotype.Component;

@Component
public class RestClientBuilderCustomizerImpl implements RestClientBuilderCustomizer {

    @Override
    public void customize(RestClientBuilder builder) {

    }

    @Override
    public void customize(HttpAsyncClientBuilder builder) {
        SSLContextBuilder sslContextBuilder = SSLContexts.custom();
        try {
            sslContextBuilder.loadTrustMaterial((chain, authType) -> {
                return true;
            });
        } catch (NoSuchAlgorithmException | KeyStoreException e) {
            e.printStackTrace();
        }
        try {
            builder.setSSLContext(sslContextBuilder.build());
        } catch (KeyManagementException | NoSuchAlgorithmException e) {
            e.printStackTrace();
        }
        builder.setSSLHostnameVerifier(NoopHostnameVerifier.INSTANCE);
    }
}