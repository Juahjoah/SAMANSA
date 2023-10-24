package com.ssafy.memetionary.common;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum CustomErrorType {

    MEMBER_NOT_FOUND("사용자를 찾을 수 없습니다."),
    WORD_NOT_FOUND("단어를 찾을 수 없습니다.");


    private final String message;

}
