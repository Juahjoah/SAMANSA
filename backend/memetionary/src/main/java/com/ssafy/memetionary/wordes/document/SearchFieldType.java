package com.ssafy.memetionary.wordes.document;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum SearchFieldType {
    NAME("name"),
    NORI_NAME("noriName"),
    NORI_NAME_JASO("noriName.jaso"),
    NAME_KEYWORD("name.keyword"),
    MEMBER_NICKNAME("memberNickname"),
    HASHTAG("hashtags"),
    SCORE("_score"),
    ID("_id");
    private final String fieldName;
}
