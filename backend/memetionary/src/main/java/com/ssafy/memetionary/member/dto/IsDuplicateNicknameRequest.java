package com.ssafy.memetionary.member.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@AllArgsConstructor
@RequiredArgsConstructor
public class IsDuplicateNicknameRequest {

    private String nickname;

}