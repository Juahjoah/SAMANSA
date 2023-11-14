package com.ssafy.memetionary.wordes.service;

import com.ssafy.memetionary.common.CustomErrorType;
import com.ssafy.memetionary.common.exception.WordNotFoundException;
import com.ssafy.memetionary.wordes.document.LikeType;
import com.ssafy.memetionary.wordes.document.QueryType;
import com.ssafy.memetionary.wordes.document.SearchFieldType;
import com.ssafy.memetionary.wordes.document.WordES;
import com.ssafy.memetionary.wordes.document.WordESRequestType;
import com.ssafy.memetionary.wordes.dto.WordESAutoCompleteResponse;
import com.ssafy.memetionary.wordes.dto.WordESRegisterRequest;
import com.ssafy.memetionary.wordes.dto.WordESSearchResponse;
import com.ssafy.memetionary.wordes.repository.WordESRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
@Slf4j
public class WordESService {

    private final WordESRepository wordESRepository;

    public void registerWordES(WordESRegisterRequest request, String memberId,
        String memberNickname) {
        log.debug("request = " + request);
        WordES wordES = WordES.builder()
            .memberId(memberId)
            .memberNickname(memberNickname)
            .name(request.getWordName().trim())
            .description(request.getWordDescription())
            .example(request.getWordExample())
            .hashtags(getHashtags(request.getWordHashtag()))
            .build();
        wordESRepository.save(wordES);
    }
    //엘라스틱 서치 단어 등록 - 단어 4-1

    private List<String> getHashtags(String hashtag) {
        hashtag = hashtag.replaceAll("[ ,]", "");
        List<String> hashtags = Arrays.stream(hashtag.split("#")).toList();
        return hashtags.subList(1, hashtags.size());
    }

    //단어 삭제
    public void delete(WordES wordES) {
        wordESRepository.delete(wordES);
    }

    public void delete(String wordId) {
        WordES wordES = wordESRepository.findById(wordId)
            .orElseThrow(
                () -> new WordNotFoundException(CustomErrorType.WORD_NOT_FOUND.getMessage()));
        delete(wordES);
    }

    //엘라스틱 서치 단어 좋아요/싫어요 - 단어 5
    public WordESSearchResponse likeWord(String clientIP, String wordId, LikeType wordLike) {
        //단어 찾기
        WordES wordES = wordESRepository.findById(wordId)
            .orElseThrow(
                () -> new WordNotFoundException(CustomErrorType.WORD_NOT_FOUND.getMessage()));
        log.debug(wordES.getLikes().toString());
        //좋아요 취소
        wordESRepository.updateLike(WordESRequestType.DELETE_LIKE, wordES, clientIP);
        //싫어요 취소
        wordESRepository.updateLike(WordESRequestType.DELETE_DISLIKE, wordES, clientIP);

        // ==== 그럼 지금은 NONE 상태 ====

        //좋아요버튼
        if (wordLike.getFieldName().equals("up")) {
            wordESRepository.updateLike(WordESRequestType.ADD_LIKE, wordES, clientIP);
        }
        //싫어요 버튼
        else if (wordLike.getFieldName().equals("down")) {
            wordESRepository.updateLike(WordESRequestType.ADD_DISLIKE, wordES, clientIP);
        }
        try {
            // 1초 동안 일시 정지
            Thread.sleep(500);
        } catch (InterruptedException e) {
            // InterruptedException 처리
            e.printStackTrace();
        }
        WordESSearchResponse response = wordESRepository.searchWordById(wordId,clientIP);
        return response;
    }

    //엘라스틱 서치 단어 검색 - 단어 1
    public WordESSearchResponse searchByName(String name, Pageable pageable, String clientIP) {
        WordESSearchResponse wordESSearchResponse = wordESRepository.searchWords(QueryType.MATCH,
            SearchFieldType.NAME, name, clientIP, pageable);

        return wordESSearchResponse;
    }

    public WordESSearchResponse searchExact(String name, String nickName, String hashtag,
        Pageable pageable, String clientIP) {
        if (!name.isEmpty()) {
            SearchFieldType fieldType = SearchFieldType.NAME_KEYWORD;
            return wordESRepository.searchWords(QueryType.TERM, fieldType, name,
                clientIP, pageable);
        }
        if (!nickName.isEmpty()) {
            SearchFieldType fieldType = SearchFieldType.MEMBER_NICKNAME;
            return wordESRepository.searchWords(QueryType.TERM, fieldType, nickName,
                clientIP, pageable);
        }
        if (!hashtag.isEmpty()) {
            SearchFieldType fieldType = SearchFieldType.HASHTAG;
            return wordESRepository.searchWords(QueryType.TERM, fieldType, hashtag,
                clientIP, pageable);
        }
        throw new WordNotFoundException("찾는 단어 또는 사람이 없습니다.");
    }

    public WordESSearchResponse mainPage(Pageable pageable, String clientIP) {
        SearchFieldType fieldType = SearchFieldType.NAME;
        String name = "";
        return wordESRepository.searchWords(QueryType.MATCH_ALL, fieldType, name, clientIP,
            pageable);
    }

    public WordESAutoCompleteResponse getAutoCompleteWords(String word) {
        return wordESRepository.getAutoCompleteWords(word);
    }

    //단어 초성 색인 - 단어 10
    public WordESSearchResponse searchWordIndex(String name, Pageable pageable, String clientIP) {
        return wordESRepository.searchWordIndex(name, pageable, clientIP);
    }

    //ID로  단어 조회 - 단어 11
    public WordESSearchResponse searchWordById(String name, String clientIP) {
        return wordESRepository.searchWordById(name, clientIP);
    }
}
