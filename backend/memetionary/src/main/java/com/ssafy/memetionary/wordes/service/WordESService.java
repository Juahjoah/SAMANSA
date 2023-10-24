package com.ssafy.memetionary.wordes.service;

import com.ssafy.memetionary.wordes.document.WordES;
import com.ssafy.memetionary.wordes.dto.WordESRegisterRequest;
import com.ssafy.memetionary.wordes.repository.WordESRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional(readOnly = true)
public class WordESService {

    private final WordESRepository wordESRepository;

    public void registerWordES(WordESRegisterRequest request, String memberId) {
        log.debug("request = " + request);
        WordES wordES = WordES.builder()
            .memberId(memberId)
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
}
