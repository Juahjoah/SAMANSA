package com.ssafy.memetionary.hashtag.repository;

import com.ssafy.memetionary.hashtag.entity.Hashtag;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HashtagRepository extends JpaRepository<Hashtag, Integer>,HashtagRepositoryCustom {

}
