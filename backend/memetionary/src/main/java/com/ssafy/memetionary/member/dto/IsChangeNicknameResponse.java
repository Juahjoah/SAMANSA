package com.ssafy.memetionary.member.dto;

import lombok.Builder;

@Builder
public class IsChangeNicknameResponse {
    private Boolean isChange;
    private String nickname;
    private String message;
}
