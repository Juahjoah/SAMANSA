package com.ssafy.memetionary.wordes.repository;

import com.ssafy.memetionary.wordes.document.WordES;
import com.ssafy.memetionary.wordes.document.WordESRequestType;

import com.ssafy.memetionary.wordes.dto.WordESSearchResponse;
import java.util.List;
import org.springframework.data.domain.Pageable;

public interface WordESRepositoryCustom {

    public void updateLike(WordESRequestType wordESRequestType, WordES wordES, String clientIP);

    public List<String> getAutoCompleteWords(String word);

    public WordESSearchResponse searchWords(String name, String clientIP, Pageable pageable);

    public WordESSearchResponse searchExactWords(String name, String clientIP, Pageable pageable);
}
