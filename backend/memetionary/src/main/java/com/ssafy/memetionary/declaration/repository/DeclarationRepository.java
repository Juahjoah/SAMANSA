package com.ssafy.memetionary.declaration.repository;

import com.ssafy.memetionary.declaration.entity.Declaration;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface DeclarationRepository extends JpaRepository<Declaration, Long> {

    Optional<Declaration> findByWordId(String wordId);

}
