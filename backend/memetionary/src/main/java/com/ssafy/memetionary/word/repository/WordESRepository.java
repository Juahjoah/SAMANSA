package com.ssafy.memetionary.word.repository;

import com.ssafy.memetionary.word.entity.WordES;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

public interface WordESRepository extends ElasticsearchRepository<WordES, String> {
}
