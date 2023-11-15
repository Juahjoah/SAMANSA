package com.ssafy.memetionary.util;

import com.ssafy.memetionary.oauth2.token.JwtTokenService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
@Slf4j
public class HeaderUtils {
    private final JwtTokenService jwtTokenService;
    @Value("${spring.data.redis.host}")
    private String host;

    public HeaderUtils(JwtTokenService jwtTokenService) {
        this.jwtTokenService = jwtTokenService;
    }

    public String getMemberId(String authorizationHeader) {
        String accessToken = authorizationHeader.substring(7);
        return jwtTokenService.findMemberId(accessToken);
    }

    public String getClientIPFromHeader(HttpServletRequest request) {
        String clientIP = request.getHeader("client-ip").replaceAll(" ", "");
        clientIP = clientIP.replaceAll(host, "");
        clientIP = clientIP.replaceAll(",", "");
        log.debug(clientIP);
        return clientIP;
    }

    public String getClientIPFromNginx(HttpServletRequest request) {
        //ex)"1.1.1.1, 2.2.2.2" 로 입력 받음
        String clientIP = request.getHeader("X-Forwarded-For").replaceAll(" ", "");
        clientIP = clientIP.replaceAll(host, "");
        clientIP = clientIP.replaceAll(",", "");
        log.debug(clientIP);
//        String[] ips = clientIP.split(",");
//        if (ips[0].equals(host)) {
//            return ips[1];
//        }
//        return ips[0];
        return clientIP;
    }
}
