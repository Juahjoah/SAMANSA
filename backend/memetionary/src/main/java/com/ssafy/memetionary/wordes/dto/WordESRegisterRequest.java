package com.ssafy.memetionary.wordes.dto;

import lombok.Data;

@Data
public class WordESRegisterRequest {

    private String wordName;
    private String wordDescription;
    private String wordExample;
    private String wordHashtag;

}