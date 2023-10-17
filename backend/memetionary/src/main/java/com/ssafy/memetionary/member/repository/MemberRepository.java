package com.ssafy.memetionary.member.repository;

import com.ssafy.memetionary.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberRepository extends JpaRepository<Member, String> {
}
