package com.ssafy.memetionary.wordes.document;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum SortType {
    CREATE_DATE("createDate"),
    LIKE_AVG("likeAvg"),
    LIKE("like"),
    SCORE("score");

    private final String fieldName;
}
