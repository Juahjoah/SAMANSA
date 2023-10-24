package com.ssafy.memetionary.wordes.controller;

import com.ssafy.memetionary.common.dto.MessageResponse;
import com.ssafy.memetionary.util.HeaderUtils;
import com.ssafy.memetionary.wordes.dto.WordESRegisterRequest;
import com.ssafy.memetionary.wordes.service.WordESService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/word")
public class WordESController {

    private final WordESService wordESService;
    private final HeaderUtils headerUtils;

    @PostMapping
    public ResponseEntity<MessageResponse> registerWord(
        @RequestBody WordESRegisterRequest request,
        @RequestHeader(HttpHeaders.AUTHORIZATION) String authorizationHeader
    ) {
        String memberId = headerUtils.getMemberId(authorizationHeader);
        wordESService.registerWordES(request, memberId);
        return ResponseEntity.status(HttpStatus.OK)
            .body(MessageResponse.builder().message("단어 등록 성공").build());
    }
    //엘라스틱 서치 단어 등록 - 단어 4-1
}
