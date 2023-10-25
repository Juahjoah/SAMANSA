package com.ssafy.memetionary.member.service;

import com.ssafy.memetionary.member.dto.IsChangeNicknameResponse;
import com.ssafy.memetionary.member.dto.IsDuplicateNicknameResponse;
import com.ssafy.memetionary.member.entity.Member;
import com.ssafy.memetionary.member.repository.MemberRepository;
import com.ssafy.memetionary.oauth2.token.JwtToken;
import com.ssafy.memetionary.oauth2.token.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.Optional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;
    private final JwtTokenProvider tokenProvider;

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

    @Transactional
    public JwtToken modifyNickname(String memberId, String nickname) {
        Optional<Member> findMember = memberRepository.findById(memberId);
        findMember.get().setNickname(nickname);
        findMember.get().setChangeStatus(true);

        SimpleGrantedAuthority authority = new SimpleGrantedAuthority("ROLE_USER");
        User userDetails = new User(memberId, "", Collections.singleton(authority));
        Authentication authentication = new UsernamePasswordAuthenticationToken(userDetails, "", userDetails.getAuthorities());

        return tokenProvider.generateNewToken(authentication);
    }
    //닉네임 등록 - 멤버 2

    public IsDuplicateNicknameResponse isDuplicateNickname(String nickname) {
        Optional<Member> findMember = memberRepository.findByNickname(nickname);
        boolean isDuplicateNickname = findMember.isPresent();
        return IsDuplicateNicknameResponse.builder().isDuplicate(isDuplicateNickname).build();
    }
    //닉네임 중복 검사 - 멤버 3

}
