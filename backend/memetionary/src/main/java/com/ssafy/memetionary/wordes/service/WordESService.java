package com.ssafy.memetionary.wordes.service;

import com.ssafy.memetionary.wordes.document.WordES;
import com.ssafy.memetionary.wordes.dto.WordESRegisterRequest;
import com.ssafy.memetionary.wordes.dto.WordESSearchResponse;
import com.ssafy.memetionary.wordes.repository.WordESRepository;
import java.util.ArrayList;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

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
            .name(request.getWordName())
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

    public List<WordESSearchResponse> searchByName(String name) {
        List<WordES> wordESList = wordESRepository.findByName(name);
        List<WordESSearchResponse> wordESSearchResponseList = new ArrayList<>();
        for (WordES wordES : wordESList) {
            WordESSearchResponse wordESSearchResponse = WordESSearchResponse.builder()
                .id(wordES.getId())
                .wordName(wordES.getName())
                .wordDescription(wordES.getDescription())
                .wordExample(wordES.getExample())
                .hashtagList(wordES.getHashtags())
                .memberNickname(wordES.getMemberNickname())
                .build();
            wordESSearchResponseList.add(wordESSearchResponse);
        }

        return wordESSearchResponseList;
    }
}
