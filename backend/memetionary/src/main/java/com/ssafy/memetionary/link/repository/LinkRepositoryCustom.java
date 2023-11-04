package com.ssafy.memetionary.link.repository;

import com.ssafy.memetionary.link.entity.Link;
import java.util.List;

public interface LinkRepositoryCustom {

    List<Link> findAllByWordId(Integer wordId);
}
