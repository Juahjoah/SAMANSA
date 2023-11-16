package com.ssafy.memetionary.hashtag.repository;

import com.ssafy.memetionary.hashtag.entity.Hashtag;

public interface HashtagRepositoryCustom {
  Hashtag findByName(String hashtagName);
}
