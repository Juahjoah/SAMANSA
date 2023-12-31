package com.ssafy.memetionary.common;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum CustomErrorType {

    MEMBER_NOT_FOUND("사용자를 찾을 수 없습니다."),
    WORD_NOT_FOUND("단어를 찾을 수 없습니다."),
    WORD_AUTO_COMPLETE_FAIL("단어 자동 완성 생성에 실패했습니다"),
    NICKNAME_EMPTY("닉네임이 빈칸입니다."),
    ALREADY_REPORT("이미 신고하였습니다.");

    private final String message;

}
