package com.ssafy.memetionary.wordes.dto;

import lombok.Builder;
import lombok.Data;
import lombok.Setter;

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
    private long likeCount;
    private long dislikeCount;
    private boolean hasLike;
    private boolean hasDislike;
    private boolean isWriter;
    private String clientIP;
}
