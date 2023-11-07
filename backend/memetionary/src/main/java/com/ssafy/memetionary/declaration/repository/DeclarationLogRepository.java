package com.ssafy.memetionary.declaration.repository;

import com.ssafy.memetionary.declaration.entity.Declaration;
import com.ssafy.memetionary.declaration.entity.DeclarationLog;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface DeclarationLogRepository extends JpaRepository<DeclarationLog, Long> {

    Optional<DeclarationLog> findByMemberIdAndDeclaration(String memberId, Declaration declaration);

}
