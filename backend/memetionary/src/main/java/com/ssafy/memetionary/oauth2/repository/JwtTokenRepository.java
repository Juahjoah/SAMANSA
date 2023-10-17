package com.ssafy.memetionary.oauth2.repository;

import com.ssafy.memetionary.oauth2.token.JwtToken;
import org.springframework.data.repository.CrudRepository;

public interface JwtTokenRepository extends CrudRepository<JwtToken, String> {
}