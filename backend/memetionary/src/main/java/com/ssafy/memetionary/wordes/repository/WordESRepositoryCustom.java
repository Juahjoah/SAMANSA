package com.ssafy.memetionary.wordes.repository;

import com.ssafy.memetionary.wordes.document.WordES;
import com.ssafy.memetionary.wordes.document.WordESRequestType;
import com.ssafy.memetionary.wordes.dto.WordESAutoCompleteResponse;

public interface WordESRepositoryCustom {
    public void updateLike(WordESRequestType wordESRequestType, WordES wordES, String clientIP);
    public WordESAutoCompleteResponse getAutoCompleteWords(String word);
}
