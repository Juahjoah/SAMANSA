package com.ssafy.memetionary.wordes.document;

import lombok.Builder;
import lombok.Getter;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.DateFormat;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;
import org.springframework.data.elasticsearch.annotations.Mapping;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Builder
@Getter
//@Setting(settingPath = "elasticsearch/word-setting.json")
@Mapping(mappingPath = "elasticsearch/word-mapping.json")
@Document(indexName = "#{@esConfig.getWordIndexName()}")
public class WordES {

    @Id
    @Field(type = FieldType.Keyword)
    private String id;

    @Field(type = FieldType.Text)
    private String name;

    @Field(type = FieldType.Text)
    private String description;

    @Field(type = FieldType.Text)
    private String example;

    @Field(type = FieldType.Keyword)
    private String memberId;

    @Field(type = FieldType.Keyword)
    private String memberNickname;

    @Field(type = FieldType.Date, format = DateFormat.date_hour_minute_second)
    @Builder.Default
    private LocalDateTime createDate = LocalDateTime.now();

    @Field(type = FieldType.Keyword)
    @Builder.Default
    private List<String> hashtags = new ArrayList<>();

    @Field(type = FieldType.Keyword)
    @Builder.Default
    private List<String> likes = new ArrayList<>();

    @Field(type = FieldType.Long)
    @Builder.Default
    private long likeCount = 0;

    @Field(type = FieldType.Keyword)
    @Builder.Default
    private List<String> dislikes = new ArrayList<>();

    @Field(type = FieldType.Long)
    @Builder.Default
    private long dislikeCount = 0;
}
