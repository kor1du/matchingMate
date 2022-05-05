package com.matching.system.repository;

import com.matching.system.domain.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {
    // 회원 가입, 수정
    Member save(Member member);

//    @EntityGraph(attributePaths = "authorities")
//    Optional<Member> findOneWithAuthoritiesByUserId(String userId);

    // 한명 조회
//    @Query(value = "SELECT DISTINCT m FROM Member m JOIN FETCH m.memberAuthorities WHERE m.id=:memberId")
//    @Query("SELECT m FROM member m WHERE m.id=:memberId JOIN FETCH m.memberAuthority")
    Optional<Member> findById(Long memberId);

    // 전체 조회
    @Query(value = "SELECT m.*, ma.* FROM member m, member_authority ma WHERE m.id = ma.member_id AND ma.authority=:roleType", nativeQuery = true)
    List<Member> findAllUser(@Param("roleType") String roleType);

    // 아이디 조회
    @Query("SELECT DISTINCT m FROM Member m JOIN FETCH m.memberAuthorities WHERE m.userId=:userId")
    Optional<Member> findByUserId(@Param("userId") String userId);

    // 중복 회원 가입
    Optional<Member> findByUserIdAndPhone(String userId, String phone);



}
