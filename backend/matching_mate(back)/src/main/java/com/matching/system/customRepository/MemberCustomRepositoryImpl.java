package com.matching.system.customRepository;

import com.matching.system.domain.QMember;
import com.matching.system.domain.QMemberAuthority;
import com.matching.system.domain.RoleType;
import com.matching.system.dto.MemberDTO;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
@RequiredArgsConstructor
public class MemberCustomRepositoryImpl implements MemberCustomRepository {
    private final JPAQueryFactory jpaQueryFactory;


    @Override
    public Optional<MemberDTO.ReadMemberInfoDTO> findById(Long memberId) {
        QMember qMember = QMember.member;

        return Optional.ofNullable(jpaQueryFactory.select(Projections.fields(MemberDTO.ReadMemberInfoDTO.class,
                            qMember.id,
                            qMember.userId,
                            qMember.userPw,
                            qMember.birthday,
                            qMember.sex,
                            qMember.nickname,
                            qMember.name,
                            qMember.phone,
                            qMember.address
                        ))
                .from(qMember)
                .where(qMember.id.eq(memberId))
                .fetchFirst()
        );
    }

    @Override
    public List<MemberDTO.ReadMemberInfoDTO> findAllUser(String roleType) {
        QMember qMember = QMember.member;
        QMemberAuthority qMemberAuthority = QMemberAuthority.memberAuthority;

        return jpaQueryFactory.select(Projections.fields(MemberDTO.ReadMemberInfoDTO.class,
                        qMember.id,
                        qMember.userId,
                        qMember.userPw,
                        qMember.birthday,
                        qMember.sex,
                        qMember.nickname,
                        qMember.name,
                        qMember.phone,
                        qMember.address
                ))
                .from(qMember)
                .leftJoin(qMember.memberAuthorities, qMemberAuthority).fetchJoin()
                .where(qMemberAuthority.authority.eq(RoleType.valueOf(RoleType.ROLE_USER.name())))
                .fetch();
    }

    @Override
    public Optional<MemberDTO.CheckDuplicateId> findByUserId(String userId) {
        QMember qMember = QMember.member;

        return Optional.ofNullable(
                jpaQueryFactory.select(Projections.fields(MemberDTO.CheckDuplicateId.class,
                                qMember.userId))
                        .from(qMember)
                        .where(qMember.userId.eq(userId))
                        .fetchOne()
        );
    }
}
