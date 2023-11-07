package com.ssafy.memetionary.common.exception;

public class QueryNotFoundException extends RuntimeException {

    public QueryNotFoundException(String message) {
        super(message);
    }
}
