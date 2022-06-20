package com.matching.system.repository;

import com.matching.system.domain.MemberAuthority;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MemberAuthorityRepository extends JpaRepository<MemberAuthority, Long> {
    MemberAuthority save(MemberAuthority memberAuthority);
}
