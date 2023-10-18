package com.ssafy.memetionary.word.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "word")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Word {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "word_id")
  private Integer id;

  @Column(length = 100, nullable = false)
  private String wordName;

  @Column(nullable = false)
  private String wordDescription;

  @Column(nullable = false)
  private String wordExample;

  // MEMBER 추가하기!
//  @ManyToOne(fetch = FetchType.LAZY)
//  @JoinColumn(name="member_id")
//    private Member member;
}
