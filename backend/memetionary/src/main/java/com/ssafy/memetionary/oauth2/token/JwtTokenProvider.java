package com.ssafy.memetionary.oauth2.token;

import com.ssafy.memetionary.common.CustomErrorType;
import com.ssafy.memetionary.common.exception.MemberNotFoundException;
import com.ssafy.memetionary.member.entity.Member;
import com.ssafy.memetionary.member.repository.MemberRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.xml.bind.DatatypeConverter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Arrays;
import java.util.Collection;
import java.util.Date;
import java.util.stream.Collectors;

@Slf4j
@Component
public class JwtTokenProvider {

    private final String AUTHENTICATION_PREFIX;

    private final long ACCESS_TOKEN_EXPIRATION_TIME;
    private final long REFRESH_TOKEN_EXPIRATION_TIME;

    private final Key key;
    private final MemberRepository memberRepository;

    public JwtTokenProvider(
        @Value("${spring.jwt.secret}") String secretKey,
        @Value("${spring.jwt.prefix}") String authenticationPrefix,
        @Value("${spring.jwt.token.access-expiration-time}") long accessExpirationTime,
        @Value("${spring.jwt.token.refresh-expiration-time}") long refreshExpirationTime,
        MemberRepository memberRepository
    ) {
        byte[] secretByteKey = DatatypeConverter.parseBase64Binary(secretKey);
        this.key = Keys.hmacShaKeyFor(secretByteKey);
        this.AUTHENTICATION_PREFIX = authenticationPrefix;
        this.ACCESS_TOKEN_EXPIRATION_TIME = accessExpirationTime;
        this.REFRESH_TOKEN_EXPIRATION_TIME = refreshExpirationTime;
        this.memberRepository = memberRepository;
    }

    public JwtToken generateToken(Authentication authentication) {
        String authorities = authentication.getAuthorities().stream()
            .map(GrantedAuthority::getAuthority)
            .collect(Collectors.joining(","));

        DefaultOAuth2User defaultOAuth2User = (DefaultOAuth2User) authentication.getPrincipal();
        String memberId = defaultOAuth2User.getName();
        String nickname = memberRepository.findById(memberId).get().getNickname();

        String accessToken = getAccessToken(nickname, authorities);
        String refreshToken = getRefreshToken();

        return getJwtToken(accessToken, refreshToken, memberId);
    }

    public JwtToken generateNewToken(Authentication authentication) {
        String authorities = authentication.getAuthorities().stream()
            .map(GrantedAuthority::getAuthority)
            .collect(Collectors.joining(","));

        User userDetails = (User) authentication.getPrincipal();
        String memberId = userDetails.getUsername();
        Member findMember = memberRepository.findById(memberId)
            .orElseThrow(() -> new MemberNotFoundException(CustomErrorType.MEMBER_NOT_FOUND.getMessage()));
        String nickname = findMember.getNickname();

        String accessToken = getAccessToken(nickname, authorities);
        String refreshToken = getRefreshToken();

        return getJwtToken(accessToken, refreshToken, memberId);
    }

    private String getAccessToken(String nickname, String authorities) {
        return Jwts.builder()
            //임시 닉네임 수정
            .setSubject(nickname)
            .claim("auth", authorities)
            .setExpiration(new Date(System.currentTimeMillis() + ACCESS_TOKEN_EXPIRATION_TIME))
            .signWith(key, SignatureAlgorithm.HS256)
            .compact();
    }

    private String getRefreshToken() {
        return Jwts.builder()
            .setExpiration(new Date(System.currentTimeMillis() + REFRESH_TOKEN_EXPIRATION_TIME))
            .signWith(key, SignatureAlgorithm.HS256)
            .compact();
    }

    private JwtToken getJwtToken(String accessToken, String refreshToken, String memberId) {
        return JwtToken.builder()
            .grantType(AUTHENTICATION_PREFIX)
            .accessToken(accessToken)
            .refreshToken(refreshToken)
            .memberId(memberId)
            .build();
    }

    public Authentication getAuthentication(String accessToken) {
        //토큰 복호화
        Claims claims = parseClaims(accessToken);

        if (claims.get("auth") == null) {
            throw new RuntimeException("권한 정보가 없는 토큰입니다.");
        }

        Collection<? extends GrantedAuthority> authorities =
            Arrays.stream(claims.get("auth").toString().split(","))
                .map(SimpleGrantedAuthority::new)
                .collect(Collectors.toList());

        UserDetails principal = new User(claims.getSubject(), "", authorities);
        return new UsernamePasswordAuthenticationToken(principal, "", authorities);
    }

    public boolean validateToken(String token, HttpServletRequest request) throws Exception {
        String message = "";
        try {
            Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
            return true;
        } catch (io.jsonwebtoken.security.SecurityException | MalformedJwtException e) {
            log.info("Invalid JWT Token", e);
            message = "Invalid JWT Token";
        } catch (ExpiredJwtException e) {
            log.info("Expired JWT Token", e);
            if (request.getRequestURI().equals("/api/token/new")) {
                return true;
            }
            message = "Expired JWT Token";
        } catch (UnsupportedJwtException e) {
            log.info("Unsupported JWT Token", e);
            message = "Unsupported JWT Token";
        } catch (IllegalArgumentException e) {
            log.info("JWT claims string is empty.", e);
            message = "JWT claims string is empty.";
        }
        throw new Exception(message);
    }

    private Claims parseClaims(String accessToken) {
        try {
            return Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(accessToken).getBody();
        } catch (ExpiredJwtException e) {
            return e.getClaims();
        }
    }
}