package com.ssafy.memetionary.wordes.service;

import com.ssafy.memetionary.common.CustomErrorType;
import com.ssafy.memetionary.common.exception.WordNotFoundException;
import com.ssafy.memetionary.wordes.document.SearchFieldType;
import com.ssafy.memetionary.wordes.document.WordES;
import com.ssafy.memetionary.wordes.document.WordESRequestType;
import com.ssafy.memetionary.wordes.dto.WordESAutoCompleteResponse;
import com.ssafy.memetionary.wordes.dto.WordESRegisterRequest;
import com.ssafy.memetionary.wordes.dto.WordESSearchItem;
import com.ssafy.memetionary.wordes.dto.WordESSearchResponse;
import com.ssafy.memetionary.wordes.repository.WordESRepository;

import java.util.ArrayList;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
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
    public WordESSearchResponse searchByName(String name, Pageable pageable,
        String clientIP) {
        String queryType = "match";
        SearchFieldType fieldType = SearchFieldType.NAME;
        WordESSearchResponse wordESSearchResponse = wordESRepository.searchWords(queryType,
            fieldType, name, clientIP, pageable);

        return wordESSearchResponse;
    }

    public WordESSearchResponse searchExact(String name, String nickName, Pageable pageable,
        String clientIP) {
        String queryType = "term";
        if (!name.equals("")) {
            SearchFieldType fieldType = SearchFieldType.NAME_KEYWORD;
            return wordESRepository.searchWords(queryType, fieldType, name,
                clientIP, pageable);
        }
        if (!nickName.equals("")) {
            SearchFieldType fieldType = SearchFieldType.MEMBER_NICKNAME;
            return wordESRepository.searchWords(queryType, fieldType, nickName,
                clientIP, pageable);
        }
        throw new WordNotFoundException("찾는 단어 또는 사람이 없습니다.");
    }

    public WordESSearchResponse mainPage(Pageable pageable) {
        Sort sort = Sort.by(Direction.DESC, "createDate");
        Pageable newpageable = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(),
            sort);
        List<WordES> wordESList = wordESRepository.findAll(newpageable).getContent();
        List<WordESSearchItem> wordESSearchItems = new ArrayList<>();
        for (WordES wordES : wordESList) {
            WordESSearchItem wordESSearchItem = WordESSearchItem.builder()
                .id(wordES.getId())
                .wordName(wordES.getName())
                .wordDescription(wordES.getDescription())
                .wordExample(wordES.getExample())
                .hashtagList(wordES.getHashtags())
                .memberNickname(wordES.getMemberNickname())
                .createDate(wordES.getCreateDate())
                .build();
            wordESSearchItems.add(wordESSearchItem);
        }

        long total = wordESRepository.findAll(newpageable).getTotalElements();
        log.debug("total = " + total);

        return WordESSearchResponse.builder()
            .total(total)
            .words(wordESSearchItems)
            .build();
    }

    public WordESAutoCompleteResponse getAutoCompleteWords(String word) {
        return wordESRepository.getAutoCompleteWords(word);
    }
}
