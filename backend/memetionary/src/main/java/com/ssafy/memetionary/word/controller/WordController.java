package com.ssafy.memetionary.word.controller;

import com.ssafy.memetionary.common.dto.MessageResponse;
import com.ssafy.memetionary.hashtag.service.HashtagService;
import com.ssafy.memetionary.link.service.LinkService;
import com.ssafy.memetionary.util.HeaderUtils;
import com.ssafy.memetionary.word.dto.WordRegisterDto;
import com.ssafy.memetionary.word.entity.Word;
import com.ssafy.memetionary.word.repository.WordRepository;
import com.ssafy.memetionary.word.service.WordService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
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
    private final LinkService linkService;
    private final HeaderUtils headerUtils;
    private final WordRepository wordRepository;

    @PostMapping
    public ResponseEntity<?> registerWord(@RequestBody WordRegisterDto wordRegisterDto,
                                          @RequestHeader(HttpHeaders.AUTHORIZATION) String authorizationHeader) {
        String memberId = headerUtils.getMemberId(authorizationHeader);
        Word word = wordService.save(wordRegisterDto, memberId);//단어 저장
        hashtagService.save(wordRegisterDto.getHashtags(), word);//해시태그 저장 및 link

        return ResponseEntity.status(HttpStatus.OK)
            .body(MessageResponse.builder().message("단어 등록 성공").build());
    }

    @DeleteMapping("/{wordId}")
    public ResponseEntity<?> deleteWord(@PathVariable("wordId") Integer wordId,
                                        @RequestHeader(HttpHeaders.AUTHORIZATION) String authorizationHeader) {
        String memberId = headerUtils.getMemberId(authorizationHeader);
        //단어 검색하기
        Word word = wordRepository.findById(wordId).get();
        if (word.getMember().getId().equals(memberId)) {//만약 작성자가 맞다면 진행
            //연결된 링크 삭제
            linkService.delete(wordId);
            //단어 삭제
            wordService.delete(word);
        } else {//만약 작성자가 아니라면 삭제 불가능
            return ResponseEntity.status(HttpStatus.OK)
                .body(MessageResponse.builder().message("단어 삭제 실패 - 작성자가 아닙니다.").build());
        }

        return ResponseEntity.status(HttpStatus.OK)
            .body(MessageResponse.builder().message("단어 삭제 성공").build());
    }
}
