package com.ssafy.memetionary.word.entity;

import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Builder
@Data
@Document(indexName = "word")
public class WordES {
    @Id
    private String id;

    @Field(type = FieldType.Text)
    private String name;

    @Field(type = FieldType.Text)
    private String description;

    @Field(type = FieldType.Text)
    private String example;

    @Field(type = FieldType.Text)
    private String memberId;

    @Field(type = FieldType.Date)
    @Builder.Default
    private LocalDate createDate = LocalDate.now();

    @Field(type = FieldType.Keyword, store = true)
    @Builder.Default
    private List<String> hashtags = new ArrayList<>();

    @Field(type = FieldType.Keyword, store = true)
    @Builder.Default
    private List<String> likes = new ArrayList<>();

    @Field(type = FieldType.Long, store = true)
    @Builder.Default
    private long likeCount = 0;

    @Field(type = FieldType.Keyword, store = true)
    @Builder.Default
    private List<String> dislikes = new ArrayList<>();

    @Field(type = FieldType.Long, store = true)
    @Builder.Default
    private long dislikeCount = 0;
}
