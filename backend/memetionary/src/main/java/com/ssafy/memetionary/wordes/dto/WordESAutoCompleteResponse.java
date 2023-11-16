package com.ssafy.memetionary.wordes.dto;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class WordESAutoCompleteResponse {

    private List<WordESAutoCompleteItem> words;

}
