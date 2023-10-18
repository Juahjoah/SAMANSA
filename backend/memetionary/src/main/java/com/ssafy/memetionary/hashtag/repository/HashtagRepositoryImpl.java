package com.ssafy.memetionary.hashtag.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.memetionary.hashtag.entity.Hashtag;
import lombok.RequiredArgsConstructor;

import static com.ssafy.memetionary.hashtag.entity.QHashtag.hashtag;

@RequiredArgsConstructor
public class HashtagRepositoryImpl implements HashtagRepositoryCustom{
  private final JPAQueryFactory jpaQueryFactory;
  @Override
  public Hashtag findByName(String hashtagName) {

    return jpaQueryFactory
        .selectFrom(hashtag)
        .where(hashtag.hashtagName.eq(hashtagName)).fetchOne();
  }
}
