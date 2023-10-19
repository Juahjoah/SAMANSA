package com.ssafy.memetionary.hashtag.service;

import com.ssafy.memetionary.hashtag.entity.Hashtag;
import com.ssafy.memetionary.hashtag.repository.HashtagRepository;
import com.ssafy.memetionary.link.entity.Link;
import com.ssafy.memetionary.link.repository.LinkRepository;
import com.ssafy.memetionary.word.entity.Word;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional(readOnly = true)
public class HashtagService {

    private final HashtagRepository hashtagRepository;
    private final LinkRepository linkRepository;

    //해시태그 등록
    @Transactional
    public void save(String hashtags, Word word) {
        //해시태그 분리하기
        String hashtag = hashtags.replaceAll(" ", "");
        String[] hashtagArr = hashtag.split("#");
        //만약 있다면 패스하고 없다면 등록하기
        for (int i = 1; i < hashtagArr.length; i++) {
            Hashtag existingHashtag = hashtagRepository.findByName(hashtagArr[i]);
            if (existingHashtag == null) {//만약 해시태그가 없다면 등록하기
                Hashtag newHashtag = new Hashtag();
                newHashtag.setHashtagName(hashtagArr[i]);
                hashtagRepository.save(newHashtag);
                //link해주기
                Link link = Link.builder()
                    .word(word)
                    .hashtag(newHashtag)
                    .build();
                linkRepository.save(link);
            } else {
                //만약 해시태그가 있다면 그냥 바로 link해주기
                Link link = Link.builder()
                    .word(word)
                    .hashtag(existingHashtag)
                    .build();
                linkRepository.save(link);
            }
        }
    }
}
