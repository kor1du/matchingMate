package com.matching.system.control.jwt.custom.userdetails;

import com.matching.system.control.jwt.redis.CacheKey;
import com.matching.system.domain.Member;
import com.matching.system.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.NoSuchElementException;


@Service
@RequiredArgsConstructor
@Transactional
public class CustomUserDetailService implements UserDetailsService {
    private final MemberRepository memberRepository;

    @Override
    @Cacheable(value = CacheKey.USER, key = "#userId", unless = "#result == null")
    public UserDetails loadUserByUsername(String userId) throws UsernameNotFoundException {
//        Optional<Member> findMember = memberRepository.findByUserId(userId);

        Member findMember = memberRepository.findByUserId(userId)
                .orElseThrow(() -> new NoSuchElementException("없는 회원입니다."));

        return CustomUserDetails.of(findMember);

//        if (findMember.isPresent()) {
//            return new User(findMember.get().getUserId(), findMember.get().getUserPw(), findMember.get().getAuthorities());
//        } else {
//            throw new UsernameNotFoundException("User not found with username: " + userId);
//        }
    }
}
