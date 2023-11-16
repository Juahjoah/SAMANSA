package com.ssafy.memetionary.wordes.document;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum QueryType {
    MATCH("match"),
    TERM("term"),
    NEW("new"),
    MATCH_ALL("matchAll");

    private final String fieldName;
}
