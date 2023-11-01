package com.ssafy.memetionary.wordes.repository;

import com.ssafy.memetionary.wordes.document.WordES;
import com.ssafy.memetionary.wordes.document.WordESRequestType;

import java.util.List;

public interface WordESRepositoryCustom {
    public void updateLike(WordESRequestType wordESRequestType, WordES wordES, String clientIP);
    public List<String> getAutoCompleteWords(String word);
}
