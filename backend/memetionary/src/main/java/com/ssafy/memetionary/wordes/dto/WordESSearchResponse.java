package com.ssafy.memetionary.wordes.dto;

import java.time.LocalDate;
import java.util.List;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class WordESSearchResponse {

    private String id;
    private String wordName;
    private String wordDescription;
    private String wordExample;
    private List<String> hashtagList;
    private String memberNickname;
    private LocalDate createDate;
}
