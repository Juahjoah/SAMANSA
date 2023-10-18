package com.ssafy.memetionary.word.repository;

import com.ssafy.memetionary.word.entity.Word;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WordRepository extends JpaRepository<Word, Integer> {

}
