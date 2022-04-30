package com.matching.system.service;

import com.matching.system.domain.MatchingHistory;
import com.matching.system.domain.MatchingMember;
import com.matching.system.domain.Member;
import com.matching.system.repository.MatchingMemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class MatchingMemberService {
    private final MatchingMemberRepository matchingMemberRepository;

    // 매칭 회원 저장
    public void save(MatchingHistory matchingPost, Member member)
    {
        MatchingMember matchingMember = MatchingMember.builder()
                .member(member)
                .matchingHistory(matchingPost)
                .build();

        matchingMemberRepository.save(matchingMember);
    }
}
