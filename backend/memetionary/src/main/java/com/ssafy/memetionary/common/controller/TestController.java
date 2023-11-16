package com.ssafy.memetionary.common.controller;

import java.util.HashMap;
import java.util.Map;

import com.ssafy.memetionary.util.HeaderUtils;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/test")
public class TestController {

    private final HeaderUtils headerUtils;

    @GetMapping("/get-ip")
    public ResponseEntity<?> testIP(HttpServletRequest request) {
        String remoteAddr1 = request.getRemoteAddr();
        String remoteAddr2 = request.getHeader("X-Forwarded-For");
        String remoteAddr3 = request.getHeader("X-Real-IP");
        Map<String, String> response = new HashMap<>();
        response.put("remoteAddr1", remoteAddr1);
        response.put("remoteAddr2", remoteAddr2);
        response.put("remoteAddr3", remoteAddr3);
        response.put("clientIP", headerUtils.getClientIPFromNginx(request));
        response.put("header('client-ip')", headerUtils.getClientIPFromHeader(request));
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }
}
