package com.ssafy.memetionary.link.service;

import com.ssafy.memetionary.link.entity.Link;
import com.ssafy.memetionary.link.repository.LinkRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional(readOnly = true)
public class LinkService {
    private final LinkRepository linkRepository;

    //연결 삭제
    @Transactional
    public void delete(Integer wordId){
        //연결된 모든 링크 찾기
        List<Link> linkList = linkRepository.findAllByWordId(wordId);
        //모든 링크 삭제
        for (Link link : linkList) {
            linkRepository.delete(link);
        }
    }
}
