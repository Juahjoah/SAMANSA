package com.ssafy.memetionary.wordes.repository;

import com.ssafy.memetionary.wordes.document.WordES;
import java.util.List;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

public interface WordESRepository extends ElasticsearchRepository<WordES, String> {
    public List<WordES> findByName(String name);
}
