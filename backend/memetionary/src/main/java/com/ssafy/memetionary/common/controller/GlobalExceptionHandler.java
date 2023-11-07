package com.ssafy.memetionary.common.controller;

import com.ssafy.memetionary.common.dto.MessageResponse;
import com.ssafy.memetionary.common.exception.AlreadyReportException;
import com.ssafy.memetionary.common.exception.MemberNotFoundException;
import com.ssafy.memetionary.common.exception.NicknameEmptyException;
import com.ssafy.memetionary.common.exception.WordNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler({
        MemberNotFoundException.class,
        WordNotFoundException.class,
        NicknameEmptyException.class,
        AlreadyReportException.class
    })
    public ResponseEntity<MessageResponse> customBadRequestException(Exception e) {
        return ResponseEntity
            .status(HttpStatus.BAD_REQUEST)
            .body(
                MessageResponse
                    .builder()
                    .message(e.getMessage())
                    .build()
            );
    }

}
