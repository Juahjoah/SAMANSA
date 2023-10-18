package com.ssafy.memetionary.hashtag.entity;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "hashtag")
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Hashtag {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "hashtag_id")
  private Integer id;

  @Column(length = 30, nullable = false)
  private String hashtagName;

}
