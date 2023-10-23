package com.ssafy.memetionary.member.dto;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class IsChangeNicknameResponse {
    private Boolean isChange;
    private String nickname;
    private String message;
}
