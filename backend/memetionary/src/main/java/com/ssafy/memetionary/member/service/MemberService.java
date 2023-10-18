package com.ssafy.memetionary.member.service;

import com.ssafy.memetionary.member.dto.IsChangeNicknameResponse;
import com.ssafy.memetionary.member.dto.IsDuplicateNicknameResponse;
import com.ssafy.memetionary.member.entity.Member;
import com.ssafy.memetionary.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;

    public IsChangeNicknameResponse isChangeNickname(String memberId) {
        Optional<Member> findMember = memberRepository.findById(memberId);
        boolean isChangeNickname = findMember.get().isChangeStatus();
        if (!isChangeNickname) {
            return IsChangeNicknameResponse.builder().isChange(false).message("닉네임 변경이 가능합니다.").build();
        }
        String nickname = findMember.get().getNickname();
        return IsChangeNicknameResponse.builder().isChange(true).message("닉네임 변경이 불가합니다.").nickname(nickname).build();
    }
    //닉네임 변경 여부 조회 - 멤버 1

    public IsDuplicateNicknameResponse isDuplicateNickname(String nickname) {
        Optional<Member> findMember = memberRepository.findByNickname(nickname);
        boolean isDuplicateNickname = findMember.isPresent();
        return IsDuplicateNicknameResponse.builder().isDuplicate(isDuplicateNickname).build();
    }
    //닉네임 중복 검사 - 멤버 3

}
