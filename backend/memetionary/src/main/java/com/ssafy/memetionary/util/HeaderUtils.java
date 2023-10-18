package com.ssafy.memetionary.util;

import com.ssafy.memetionary.oauth2.token.JwtTokenService;
import org.springframework.stereotype.Component;

@Component
public class HeaderUtils {
    private final JwtTokenService jwtTokenService;

    public HeaderUtils(JwtTokenService jwtTokenService) {
        this.jwtTokenService = jwtTokenService;
    }

    public String getMemberId(String authorizationHeader) {
        String accessToken = authorizationHeader.substring(7);
        return jwtTokenService.findUserId(accessToken);
    }
}
