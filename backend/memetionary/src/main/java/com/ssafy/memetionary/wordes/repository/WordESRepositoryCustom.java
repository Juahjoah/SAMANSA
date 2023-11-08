package com.ssafy.memetionary.wordes.repository;

import com.ssafy.memetionary.wordes.document.SearchFieldType;
import com.ssafy.memetionary.wordes.document.WordES;
import com.ssafy.memetionary.wordes.document.WordESRequestType;
import com.ssafy.memetionary.wordes.dto.WordESAutoCompleteResponse;

import com.ssafy.memetionary.wordes.dto.WordESSearchResponse;

import org.springframework.data.domain.Pageable;

public interface WordESRepositoryCustom {

    public void updateLike(WordESRequestType wordESRequestType, WordES wordES, String clientIP);

    public WordESAutoCompleteResponse getAutoCompleteWords(String word);

    public WordESSearchResponse searchWords(String queryType, SearchFieldType fieldType,
                                            String name, String clientIP, Pageable pageable);

    public WordESSearchResponse searchWordIndex(String name, Pageable pageable);
}
