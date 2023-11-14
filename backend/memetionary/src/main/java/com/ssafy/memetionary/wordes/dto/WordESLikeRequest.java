package com.ssafy.memetionary.wordes.dto;

import com.ssafy.memetionary.wordes.document.LikeType;
import lombok.Data;

@Data
public class WordESLikeRequest {

    private LikeType wordLike;
    private String wordId;

}