package com.ssafy.memetionary.member.controller;

import com.ssafy.memetionary.member.dto.IsChangeNicknameResponse;
import com.ssafy.memetionary.member.service.MemberService;
import com.ssafy.memetionary.util.HeaderUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/member")
public class MemberController {

    private final MemberService memberService;
    private final HeaderUtils headerUtils;

    @GetMapping("/nickname/change")
    public ResponseEntity<IsChangeNicknameResponse> isChangeNickname(@RequestHeader(HttpHeaders.AUTHORIZATION) String authorizationHeader) {
        String memberId = headerUtils.getMemberId(authorizationHeader);
        IsChangeNicknameResponse response = memberService.isChangeNickname(memberId);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }
    //닉네임 변경 여부 조회 - 멤버 1

}
