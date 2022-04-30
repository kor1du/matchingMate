package com.matching.system.domain;

import lombok.*;

import javax.management.relation.Role;
import javax.persistence.*;

@Entity
@Table(name = "member_authority")
@Getter
@Setter
@Builder(builderMethodName = "MemberAuthorityBuilder")
@AllArgsConstructor
@NoArgsConstructor
public class MemberAuthority {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "member_id")
    private Member member;

    @Enumerated(EnumType.STRING)
    @Column(name = "authority")
    private RoleType authority;

//    public static MemberAuthorityBuilder builder(RoleType roleType)
//    {
//        return MemberAuthorityBuilder()
//                .authority(roleType);
//    }

}
