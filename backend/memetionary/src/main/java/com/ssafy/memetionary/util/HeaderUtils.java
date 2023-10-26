package com.ssafy.memetionary.util;

import com.ssafy.memetionary.oauth2.token.JwtTokenService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Component;

@Component
public class HeaderUtils {
    private final JwtTokenService jwtTokenService;

    public HeaderUtils(JwtTokenService jwtTokenService) {
        this.jwtTokenService = jwtTokenService;
    }

    public String getMemberId(String authorizationHeader) {
        String accessToken = authorizationHeader.substring(7);
        return jwtTokenService.findMemberId(accessToken);
    }

    public String getClientIP(HttpServletRequest request) {
        String clientIP1 = request.getRemoteAddr();
        String clientIP2 = request.getHeader("X-Forwarded-For");
        return clientIP2 != null ? clientIP2 : clientIP1;
    }
}
