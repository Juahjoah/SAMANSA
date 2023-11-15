package com.ssafy.memetionary.wordes.service;

import co.elastic.clients.elasticsearch.ElasticsearchClient;
import com.ssafy.memetionary.common.CustomErrorType;
import com.ssafy.memetionary.common.exception.WordNotFoundException;
import com.ssafy.memetionary.util.WordUtils;
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
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class WordESService {

    private final WordESRepository wordESRepository;
    private final ElasticsearchClient client;
    private final WordUtils wordUtils;

    //엘라스틱 서치 단어 등록 - 단어 4-1
    public void registerWordES(WordESRegisterRequest request, String memberId, String memberNickname) {
        log.debug("request = " + request);

        String name = request.getWordName().trim();
        String noriName = wordUtils.getNoriResult(name);
        WordES wordES = WordES.builder()
            .memberId(memberId)
            .memberNickname(memberNickname)
            .name(name)
            .noriName(noriName)
            .description(request.getWordDescription())
            .example(request.getWordExample())
            .hashtags(getHashtags(request.getWordHashtag()))
            .build();
        wordESRepository.save(wordES);
    }


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
    public void likeWord(String clientIP, String wordId, LikeType wordLike) {
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
    }

    //엘라스틱 서치 단어 검색 - 단어 1
    public WordESSearchResponse searchByName(String name, Pageable pageable, String clientIP) {

        WordESSearchResponse wordESSearchResponse = wordESRepository.searchWords(QueryType.MATCH,
            SearchFieldType.NORI_NAME_JASO, name, clientIP, pageable);

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

    //최신순으로 정렬(메인페이지) - 단어 2
    public WordESSearchResponse mainPage(Pageable pageable, String clientIP) {
        SearchFieldType fieldType = SearchFieldType.NAME;
        String name = "";
        return wordESRepository.searchWords(QueryType.MATCH_ALL, fieldType, name, clientIP,
            pageable);
    }
    public WordESSearchResponse newWord(Pageable pageable, String clientIP) {
        SearchFieldType fieldType = SearchFieldType.NAME;
        String name = "";
        return wordESRepository.searchWords(QueryType.NEW, fieldType, name, clientIP,
            pageable);
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
