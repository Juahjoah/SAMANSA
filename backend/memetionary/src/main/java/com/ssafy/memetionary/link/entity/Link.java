package com.ssafy.memetionary.link.entity;

import com.ssafy.memetionary.hashtag.entity.Hashtag;
import com.ssafy.memetionary.word.entity.Word;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "hashtag_link")
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Link {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "hashtag_link_id")
  private Integer id;

  @ManyToOne
  @JoinColumn(name = "word_id")
  private Word word;

  @ManyToOne
  @JoinColumn(name = "hashtag_id")
  private Hashtag hashtag;
}
