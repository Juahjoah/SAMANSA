package com.ssafy.memetionary.wordes.repository;

import com.ssafy.memetionary.wordes.document.WordES;
import com.ssafy.memetionary.wordes.document.WordESRequestType;

public interface WordESRepositoryCustom {
    public void updateLike(WordESRequestType wordESRequestType, WordES wordES, String clientIP);
}
