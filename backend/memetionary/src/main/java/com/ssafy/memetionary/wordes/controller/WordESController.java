package com.ssafy.memetionary.wordes.controller;

import com.ssafy.memetionary.common.CustomErrorType;
import com.ssafy.memetionary.common.dto.MessageResponse;
import com.ssafy.memetionary.common.exception.WordNotFoundException;
import com.ssafy.memetionary.member.service.MemberService;
import com.ssafy.memetionary.util.HeaderUtils;
import com.ssafy.memetionary.wordes.document.WordES;
import com.ssafy.memetionary.wordes.dto.WordESAutoCompleteResponse;
import com.ssafy.memetionary.wordes.dto.WordESLikeRequest;
import com.ssafy.memetionary.wordes.dto.WordESRegisterRequest;
import com.ssafy.memetionary.wordes.dto.WordESSearchResponse;
import com.ssafy.memetionary.wordes.repository.WordESRepository;
import com.ssafy.memetionary.wordes.service.WordESService;
import jakarta.servlet.http.HttpServletRequest;

import java.util.ArrayList;
import java.util.List;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/word")
public class WordESController {

    private final WordESService wordESService;
    private final WordESRepository wordESRepository;
    private final HeaderUtils headerUtils;
    private final MemberService memberService;

    //엘라스틱 서치 단어 등록 - 단어 4-1
    @PostMapping
    public ResponseEntity<MessageResponse> registerWord(
        @RequestBody WordESRegisterRequest request,
        @RequestHeader(HttpHeaders.AUTHORIZATION) String authorizationHeader
    ) {
        String memberId = headerUtils.getMemberId(authorizationHeader);
        String memberNickname = memberService.getMemberNickname(memberId);
        wordESService.registerWordES(request, memberId, memberNickname);
        return ResponseEntity.status(HttpStatus.OK)
            .body(MessageResponse.builder().message("단어 등록 성공").build());
    }

    //엘라스틱 서치 단어 삭제 - 단어 7
    @DeleteMapping("/{wordId}")
    public ResponseEntity<MessageResponse> deleteWord(
        @PathVariable("wordId") String wordId,
        @RequestHeader(HttpHeaders.AUTHORIZATION) String authorizationHeader
    ) {
        String memberId = headerUtils.getMemberId(authorizationHeader);

        WordES wordes = wordESRepository.findById(wordId).orElseThrow(
            () -> new WordNotFoundException(CustomErrorType.WORD_NOT_FOUND.getMessage()));

        // 만약 작성자가 맞다면 진행
        if (wordes.getMemberId().equals(memberId)) {
            wordESService.delete(wordes);
        } else {// 만약 작성자가 아니라면 삭제 불가능
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(MessageResponse.builder().message("단어 삭제 실패 - 작성자가 아닙니다.").build());
        }

        return ResponseEntity.status(HttpStatus.OK)
            .body(MessageResponse.builder().message("단어 삭제 성공").build());
    }

    //엘라스틱 서치 단어 좋아요/싫어요 - 단어 5
    @PutMapping("/like")
    public ResponseEntity<?> likeWord(@RequestBody WordESLikeRequest wordESLikeRequest,
        HttpServletRequest httpServletRequest) {
        String clientIP = headerUtils.getClientIP(httpServletRequest);
        log.debug("clientIP = " + clientIP);
        String wordId = wordESLikeRequest.getWordId();
        boolean wordLike = wordESLikeRequest.isWordLike();
        wordESService.likeWord(clientIP, wordId, wordLike);
        return ResponseEntity.status(HttpStatus.OK)
            .body(MessageResponse.builder().message("반영되었습니다.").build());
    }

    //엘라스틱 서치 단어 검색 - 단어 1
    @GetMapping("/search")
    public ResponseEntity<?> searchWord(@RequestParam("word") String name,
        @PageableDefault(size = 10) Pageable pageable, HttpServletRequest httpServletRequest) {
        System.out.println("name = " + name);

        String clientIP = headerUtils.getClientIP(httpServletRequest);

        WordESSearchResponse words = wordESService.searchByName(name, pageable, clientIP);

        return ResponseEntity.status(HttpStatus.OK).body(words);
    }

    //최신 단어 리스트 조회 - 단어 2
    @GetMapping("/main")
    public ResponseEntity<?> mainPage(@PageableDefault(size = 10) Pageable pageable) {
        WordESSearchResponse response = wordESService.mainPage(pageable);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    //엘라스틱 서치 자동 완성 - 단어 8
    @GetMapping("/auto-complete")
    public ResponseEntity<WordESAutoCompleteResponse> getAutoCompleteWords(
        @RequestParam String word) {
        log.debug("찾을 단어: " + word);
        WordESAutoCompleteResponse response = wordESService.getAutoCompleteWords(word);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }
}
