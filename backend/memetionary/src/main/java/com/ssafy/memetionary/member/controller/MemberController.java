package com.ssafy.memetionary.member.controller;

import com.ssafy.memetionary.common.dto.MessageResponse;
import com.ssafy.memetionary.member.dto.IsChangeNicknameResponse;
import com.ssafy.memetionary.member.dto.IsDuplicateNicknameRequest;
import com.ssafy.memetionary.member.dto.IsDuplicateNicknameResponse;
import com.ssafy.memetionary.member.dto.ModifyNicknameRequest;
import com.ssafy.memetionary.member.dto.ModifyNicknameResponse;
import com.ssafy.memetionary.member.service.MemberService;
import com.ssafy.memetionary.oauth2.token.JwtToken;
import com.ssafy.memetionary.oauth2.token.JwtTokenService;
import com.ssafy.memetionary.util.HeaderUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping({"/member", "/token"})
public class MemberController {

    private final MemberService memberService;
    private final HeaderUtils headerUtils;
    private final JwtTokenService jwtTokenService;

    @GetMapping("/nickname/change")
    public ResponseEntity<IsChangeNicknameResponse> isChangeNickname(@RequestHeader(HttpHeaders.AUTHORIZATION) String authorizationHeader) {
        String memberId = headerUtils.getMemberId(authorizationHeader);
        IsChangeNicknameResponse response = memberService.isChangeNickname(memberId);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }
    //닉네임 변경 여부 조회 - 멤버 1

    @PutMapping
    public ResponseEntity<ModifyNicknameResponse> modifyNickname(@RequestBody ModifyNicknameRequest request, @RequestHeader(HttpHeaders.AUTHORIZATION) String authorizationHeader) {
        log.debug(request.toString());
        String memberId = headerUtils.getMemberId(authorizationHeader);
        String accessToken = authorizationHeader.substring(7);
        JwtToken jwtToken = memberService.modifyNickname(memberId, request.getNickname());

        jwtTokenService.deleteJwtToken(accessToken);
        jwtTokenService.saveJwtToken(jwtToken);
        return ResponseEntity
            .status(HttpStatus.OK)
            .body(
                ModifyNicknameResponse
                    .builder()
                    .token(jwtToken.getAccessToken())
                    .message("닉네임 설정이 완료되었습니다.")
                    .build()
            );
    }
    //닉네임 등록 - 멤버 2

    @PostMapping("/duplicate")
    public ResponseEntity<IsDuplicateNicknameResponse> isDuplicateNickname(@RequestBody IsDuplicateNicknameRequest request) {
        String nickname = request.getNickname();
        IsDuplicateNicknameResponse response = memberService.isDuplicateNickname(nickname);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }
    //닉네임 중복 검사 - 멤버 3

    //로그아웃 - 멤버 4
    @DeleteMapping
    public ResponseEntity<MessageResponse> logout(@RequestHeader(HttpHeaders.AUTHORIZATION) String authorizationHeader) {
        String accessToken = authorizationHeader.substring(7);
        memberService.logout(accessToken);

        return ResponseEntity
            .status(HttpStatus.OK)
            .body(MessageResponse.builder().message("정상적으로 로그아웃되었습니다.").build());
    }

    //토큰 갱신 - 토큰 1
    @PostMapping("/new")
    public ResponseEntity<ModifyNicknameResponse> renewToken(@RequestHeader(HttpHeaders.AUTHORIZATION) String authorizationHeader) {
        String accessToken = authorizationHeader.substring(7);
        String memberId = headerUtils.getMemberId(authorizationHeader);
        JwtToken jwtToken = memberService.renewToken(accessToken, memberId);
        return ResponseEntity.status(HttpStatus.OK)
            .body(ModifyNicknameResponse.builder().token(jwtToken.getAccessToken()).build());
    }

}
