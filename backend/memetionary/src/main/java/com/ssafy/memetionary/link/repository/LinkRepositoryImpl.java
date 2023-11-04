package com.ssafy.memetionary.link.repository;

import static com.ssafy.memetionary.link.entity.QLink.link;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.memetionary.link.entity.Link;
import java.util.List;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class LinkRepositoryImpl implements LinkRepositoryCustom {

    private final JPAQueryFactory jpaQueryFactory;

    @Override
    public List<Link> findAllByWordId(Integer wordId) {
        return jpaQueryFactory
            .selectFrom(link)
            .where(link.word.id.eq(wordId))
            .fetch();
    }
}
