package com.ssafy.memetionary.member.entity;

import com.ssafy.memetionary.common.entity.BaseTimeEntity;
import com.ssafy.memetionary.oauth2.domain.RoleType;
import com.ssafy.memetionary.oauth2.domain.SocialType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Table(name = "member")
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Member extends BaseTimeEntity {

    @Id
    @Column(name = "member_id", length = 50)
    private String id;

    @Builder.Default
    private String password = "NO_PASS";

    @Column(length = 320)
    private String email;

    @Setter
    @Column(length = 20)
    private String nickname;

    @Setter
    private boolean changeStatus;

    @Column(length = 20)
    @Enumerated(EnumType.STRING)
    private RoleType roleType;

    @Column(length = 20)
    @Enumerated(EnumType.STRING)
    private SocialType socialType;

    public Member update(String email) {
        this.email = email;
        return this;
    }

    public String getRoleKey() {
        return this.roleType.getKey();
    }
}
