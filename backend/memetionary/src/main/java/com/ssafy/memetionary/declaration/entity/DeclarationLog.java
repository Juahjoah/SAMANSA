package com.ssafy.memetionary.declaration.entity;

import com.ssafy.memetionary.common.entity.BaseTimeEntity;
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
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Table(name = "declaration_log")
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DeclarationLog extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "declaration_log_id")
    private long id;

    private String memberId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "declaration_id")
    private Declaration declaration;

}
