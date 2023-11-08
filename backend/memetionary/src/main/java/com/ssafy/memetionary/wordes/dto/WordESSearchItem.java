package com.ssafy.memetionary.wordes.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
public class WordESSearchItem {

    private String id;
    private String wordName;
    private String wordDescription;
    private String wordExample;
    private List<String> hashtagList;
    private String memberNickname;
    private LocalDateTime createDate;
    private long likecount;
    private long dislikecount;
    private boolean hasLike;
    private boolean hasDislike;
    private boolean isWriter;
}
