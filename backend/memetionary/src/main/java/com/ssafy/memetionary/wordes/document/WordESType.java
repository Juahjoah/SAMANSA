package com.ssafy.memetionary.wordes.document;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum WordESType {
    ID("_id"),
    NAME("name"),
    NAME_CHOSUNG("name.chosung"),
    DESCRIPTION("description"),
    EXAMPLE("example"),
    MEMBER_ID("memberId"),
    MEMBER_NICKNAME("memberNickname"),
    CREATE_DATE("createDate"),
    HASHTAGS("hashtags"),
    LIKES("likes"),
    LIKE_COUNT("likeCount"),
    HAS_LIKE("has_like"),
    DISLIKES("dislikes"),
    DISLIKE_COUNT("dislikeCount"),
    HAS_DISLIKE("has_dislike"),
    IS_WRITER("is_writer");

    private final String fieldName;
}
