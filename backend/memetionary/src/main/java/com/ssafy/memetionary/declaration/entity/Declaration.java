package com.ssafy.memetionary.declaration.entity;

import com.ssafy.memetionary.common.entity.BaseTimeEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Table(name = "declaration")
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Declaration extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "declaration_id")
    private long id;

    private String wordId;

    @Setter
    @Column(name = "declaration_count")
    @Builder.Default
    private int count = 0;
}
