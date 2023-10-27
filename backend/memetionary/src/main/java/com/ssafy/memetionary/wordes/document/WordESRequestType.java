package com.ssafy.memetionary.wordes.document;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum WordESRequestType {

    ADD_LIKE("""
          if (!ctx._source.likes.contains(params.ip)) { 
            ctx._source.likes.add(params.ip);
            ctx._source.likeCount += 1; 
          }
        """),
    DELETE_LIKE("""
          if (ctx._source.likes.contains(params.ip)) { 
            ctx._source.likes.remove(ctx._source.likes.indexOf(params.ip));
            ctx._source.likeCount -= 1; 
          }
        """),
    ADD_DISLIKE("""
          if (!ctx._source.dislikes.contains(params.ip)) { 
            ctx._source.dislikes.add(params.ip);
            ctx._source.dislikeCount += 1; 
          }
        """),
    DELETE_DISLIKE("""
          if (ctx._source.dislikes.contains(params.ip)) { 
            ctx._source.dislikes.remove(ctx._source.dislikes.indexOf(params.ip));
            ctx._source.dislikeCount -= 1; 
          }
        """);

    private final String query;

}
