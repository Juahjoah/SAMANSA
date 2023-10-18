package com.ssafy.memetionary.word.service;


import com.ssafy.memetionary.hashtag.entity.Hashtag;
import com.ssafy.memetionary.member.entity.Member;
import com.ssafy.memetionary.member.repository.MemberRepository;
import com.ssafy.memetionary.word.dto.WordRegisterDto;
import com.ssafy.memetionary.word.entity.Word;
import com.ssafy.memetionary.word.repository.WordRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional(readOnly = true)
public class WordService {
    private final WordRepository wordRepository;
    private final MemberRepository memberRepository;

    @Transactional
    public void save(WordRegisterDto wordRegisterDto, String memberId) {
      Member member = memberRepository.findById(memberId).get();
      //해시태그 분리
      //해시태그 모두 돌면서 저장할거 저장하기
      Word word = Word.builder()
          .wordName(wordRegisterDto.getWordName())
          .wordDescription(wordRegisterDto.getWordDescription())
          .wordExample(wordRegisterDto.getWordExample())
          .member(member)
          .build();
      wordRepository.save(word);
    }
}
