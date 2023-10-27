package com.ssafy.memetionary.wordes.repository;

import com.ssafy.memetionary.wordes.document.WordES;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

public interface WordESRepository extends ElasticsearchRepository<WordES, String>, WordESRepositoryCustom {
}
