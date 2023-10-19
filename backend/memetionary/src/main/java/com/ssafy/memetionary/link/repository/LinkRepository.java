package com.ssafy.memetionary.link.repository;

import com.ssafy.memetionary.hashtag.repository.HashtagRepositoryCustom;
import com.ssafy.memetionary.link.entity.Link;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LinkRepository extends JpaRepository<Link, Integer>, LinkRepositoryCustom {

}
