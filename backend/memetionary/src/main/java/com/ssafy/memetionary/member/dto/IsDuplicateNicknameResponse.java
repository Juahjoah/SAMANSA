package com.ssafy.memetionary.member.dto;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class IsDuplicateNicknameResponse {

    private boolean isDuplicate;

}