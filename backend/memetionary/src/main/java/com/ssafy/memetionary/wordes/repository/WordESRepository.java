package com.ssafy.memetionary.wordes.repository;

import com.ssafy.memetionary.wordes.document.WordES;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

public interface WordESRepository extends ElasticsearchRepository<WordES, String>, WordESRepositoryCustom {
    public List<WordES> findByName(String name);

    public List<WordES> findByName(String name, Pageable pageable);
}
