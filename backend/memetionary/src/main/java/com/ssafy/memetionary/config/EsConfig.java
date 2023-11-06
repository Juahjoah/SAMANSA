package com.ssafy.memetionary.config;

import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Getter
@Component("esConfig")
public class EsConfig {
    @Value("${spring.elasticsearch.index.word}")
    private String wordIndexName;

}