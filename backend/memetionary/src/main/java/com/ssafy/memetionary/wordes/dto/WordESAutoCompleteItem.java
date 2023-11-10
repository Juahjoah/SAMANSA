package com.ssafy.memetionary.wordes.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class WordESAutoCompleteItem {

    private String name;
    private String description;

}
