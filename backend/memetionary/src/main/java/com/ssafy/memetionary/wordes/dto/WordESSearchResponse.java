package com.ssafy.memetionary.wordes.dto;

import java.time.LocalDateTime;
import java.util.List;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class WordESSearchResponse {

    long total;
    List<WordESSearchItem> words;

}
