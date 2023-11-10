package com.ssafy.memetionary.wordes.document;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum SearchFieldType {
    NAME("name"),
    NAME_KEYWORD("name.keyword"),
    MEMBER_NICKNAME("memberNickname"),
    HASHTAG("hashtags"),
    ID("_id");
    private final String fieldName;
}
