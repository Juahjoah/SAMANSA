package com.ssafy.memetionary.wordes.controller;

import com.ssafy.memetionary.common.CustomErrorType;
import com.ssafy.memetionary.common.dto.MessageResponse;
import com.ssafy.memetionary.common.exception.WordNotFoundException;
import com.ssafy.memetionary.member.service.MemberService;
import com.ssafy.memetionary.util.HeaderUtils;
import com.ssafy.memetionary.wordes.document.WordES;
import com.ssafy.memetionary.wordes.dto.WordESRegisterRequest;
import com.ssafy.memetionary.wordes.dto.WordESSearchResponse;
import com.ssafy.memetionary.wordes.repository.WordESRepository;
import com.ssafy.memetionary.wordes.service.WordESService;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
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

    @GetMapping("/search")
    public ResponseEntity<?> searchWord(@RequestParam("word") String name,
        @RequestHeader(HttpHeaders.AUTHORIZATION) String authorizationHeader) {
        System.out.println("name = " + name);
        List<WordESSearchResponse> wordESList = new ArrayList<>();

        wordESList = wordESService.searchByName(name);

        return ResponseEntity.status(HttpStatus.OK).body(wordESList);
    }
}
