package com.ssafy.memetionary.wordes.service;

import com.ssafy.memetionary.common.CustomErrorType;
import com.ssafy.memetionary.common.exception.WordNotFoundException;
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

    //단어 생성
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
            .orElseThrow(() -> new WordNotFoundException(CustomErrorType.WORD_NOT_FOUND.getMessage()));
        delete(wordES);
    }

    //엘라스틱 서치 단어 좋아요/싫어요 - 단어 5
    public void likeWord(String clientIP, String wordId, boolean wordLike) {
        WordES wordES = wordESRepository.findById(wordId)
            .orElseThrow(
                () -> new WordNotFoundException(CustomErrorType.WORD_NOT_FOUND.getMessage()));
        log.debug(wordES.getLikes().toString());
        Set<String> likes = new HashSet<>(wordES.getLikes());
        Set<String> dislikes = new HashSet<>(wordES.getDislikes());

        boolean isLike = likes.contains(clientIP);
        boolean isDislike = dislikes.contains(clientIP);

        log.debug("isLike = " + isLike);
        log.debug("isDislike = " + isDislike);

        likeProcess(isLike, isDislike, wordLike, wordES, clientIP);
    }

    private void likeProcess(boolean isLike, boolean isDislike, boolean wordLike, WordES wordES,
                             String clientIP) {
        //좋아요, 싫어요 한적 없는 경우
        if (!isLike && !isDislike) {
            if (wordLike) {
                wordESRepository.updateLike(WordESRequestType.ADD_LIKE, wordES, clientIP);
            } else {
                wordESRepository.updateLike(WordESRequestType.ADD_DISLIKE, wordES, clientIP);
            }
        }
        //현재 좋아요 상태
        else if (isLike) {
            //좋아요 취소
            wordESRepository.updateLike(WordESRequestType.DELETE_LIKE, wordES, clientIP);
            //좋아요 -> 싫어요
            if (!wordLike) {
                wordESRepository.updateLike(WordESRequestType.ADD_DISLIKE, wordES, clientIP);
            }
        }
        //싫어요
        else {
            //싫어요 취소
            wordESRepository.updateLike(WordESRequestType.DELETE_DISLIKE, wordES, clientIP);
            //싫어요 -> 좋아요
            if (wordLike) {
                wordESRepository.updateLike(WordESRequestType.ADD_LIKE, wordES, clientIP);
            }
        }
    }

    //엘라스틱 서치 단어 검색 - 단어 1
    public WordESSearchResponse searchByName(String name, Pageable pageable, String clientIP) {
        WordESSearchResponse wordESSearchResponse = wordESRepository.searchWords(QueryType.MATCH, SearchFieldType.NAME, name, clientIP, pageable);

        return wordESSearchResponse;
    }


    //단어 완전 일치 검색
    //우선 순위 : 단어, 닉네임, 해시태그 순
    public WordESSearchResponse searchExact(String name, String nickName, String hashtag, Pageable pageable, String clientIP) {
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

    //최신순으로 정렬(메인페이지) - 단어 2
    public WordESSearchResponse mainPage(Pageable pageable, String clientIP) {
        SearchFieldType fieldType = SearchFieldType.NAME;
        String name = "";
        return wordESRepository.searchWords(QueryType.MATCH_ALL, fieldType, name, clientIP, pageable);
    }

    //단어 자동완성 - 단어 8
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
