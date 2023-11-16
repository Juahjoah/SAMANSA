package com.ssafy.memetionary.declaration.controller;

import com.ssafy.memetionary.common.dto.MessageResponse;
import com.ssafy.memetionary.declaration.dto.DeclarationRequest;
import com.ssafy.memetionary.declaration.service.DeclarationService;
import com.ssafy.memetionary.util.HeaderUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/declaration")
public class DeclarationController {

    private final HeaderUtils headerUtils;
    private final DeclarationService declarationService;

    //단어 신고 - 신고 1
    @PostMapping
    public ResponseEntity<MessageResponse> reportWord(
        @RequestBody DeclarationRequest request,
        @RequestHeader(HttpHeaders.AUTHORIZATION) String authorizationHeader
    ) {
        String memberId = headerUtils.getMemberId(authorizationHeader);
        log.debug("신고할 단어 ID: " + request.getWordId());
        declarationService.reportWord(memberId, request.getWordId());
        return ResponseEntity.status(HttpStatus.OK).body(MessageResponse.builder().message("신고 등록하였습니다.").build());
    }

}
