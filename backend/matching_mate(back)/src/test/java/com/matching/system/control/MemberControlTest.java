package com.matching.system.control;

import com.matching.system.domain.Member;
import com.matching.system.domain.MemberAuthority;
import com.matching.system.domain.RoleType;
import com.matching.system.repository.MemberRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

@SpringBootTest
class MemberControlTest {
    @Autowired
    private MemberRepository memberRepository;
    @Test
    void signUp() throws ParseException {
        Member newMember = new Member();

        List<MemberAuthority> memberAuthorities = new ArrayList<>();

        MemberAuthority memberAuthority = new MemberAuthority();
        memberAuthority.setMember(newMember);
        memberAuthority.setAuthority(RoleType.ROLE_USER);

        memberAuthorities.add(memberAuthority);

        newMember.setUserId("안겹치는 ID");
        newMember.setUserPw("1234");
        newMember.setName("홍길동");
        newMember.setNickname("홍길동");
        newMember.setSex(1);

        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-mm-ss");
        newMember.setBirthday(formatter.parse("1998-06-18"));

        newMember.setPhone("010-1111-1111");
        newMember.setAddress("대구광역시 달성군");
        newMember.setMemberAuthorities(memberAuthorities);

        memberRepository.save(newMember);
    }
}