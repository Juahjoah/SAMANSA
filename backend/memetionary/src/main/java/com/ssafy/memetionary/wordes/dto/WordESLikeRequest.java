package com.ssafy.memetionary.wordes.dto;

import lombok.Data;

@Data
public class WordESLikeRequest {

    private boolean wordLike;
    private String wordId;

}