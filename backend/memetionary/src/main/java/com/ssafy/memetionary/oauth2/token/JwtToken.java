package com.ssafy.memetionary.oauth2.token;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

@Builder
@Data
@AllArgsConstructor
@RedisHash(value = "accessToken", timeToLive = 604800000L)
public class JwtToken {

    private String grantType;
    @Id
    private String accessToken;
    private String memberId;
    private String refreshToken;
}