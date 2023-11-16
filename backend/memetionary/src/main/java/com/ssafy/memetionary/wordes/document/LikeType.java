package com.ssafy.memetionary.wordes.document;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum LikeType {
    UP("up"),
    DOWN("down"),
    NONE("none");
    private final String fieldName;
}
