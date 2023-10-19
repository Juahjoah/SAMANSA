package com.ssafy.memetionary.word.controller;

import com.ssafy.memetionary.common.dto.MessageResponse;
import com.ssafy.memetionary.hashtag.service.HashtagService;
import com.ssafy.memetionary.util.HeaderUtils;
import com.ssafy.memetionary.word.dto.WordRegisterDto;
import com.ssafy.memetionary.word.entity.Word;
import com.ssafy.memetionary.word.service.WordService;
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
public class WordController {

    private final WordService wordService;
    private final HashtagService hashtagService;
    private final HeaderUtils headerUtils;

    @PostMapping
    public ResponseEntity<?> registerWord(@RequestBody WordRegisterDto wordRegisterDto,
        @RequestHeader(HttpHeaders.AUTHORIZATION) String authorizationHeader) {
        String memberId = headerUtils.getUserId(authorizationHeader);
        Word word = wordService.save(wordRegisterDto, memberId);//단어 저장
        hashtagService.save(wordRegisterDto.getHashtags(), word);//해시태그 저장 및 link

        return ResponseEntity.status(HttpStatus.OK)
            .body(MessageResponse.builder().message("단어 등록 성공").build());
    }
}
