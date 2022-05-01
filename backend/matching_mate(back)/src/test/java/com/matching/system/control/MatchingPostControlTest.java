package com.matching.system.control;

import com.matching.system.domain.Category;
import com.matching.system.domain.MatchingPost;
import com.matching.system.domain.Member;
import com.matching.system.repository.CategoryRepository;
import com.matching.system.repository.MatchingPostRepository;
import com.matching.system.repository.MemberRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.text.ParseException;
import java.text.SimpleDateFormat;

@SpringBootTest
//@RequiredArgsConstructor
class MatchingPostControlTest {
    @Autowired private MatchingPostRepository matchingPostRepository;
    @Autowired private CategoryRepository categoryRepository;
    @Autowired private MemberRepository memberRepository;

    @Test
    void createMatchingPost() throws ParseException {

        MatchingPost newMatchingPost = new MatchingPost();

        Category findCategory = categoryRepository.findById(1L).get();
        newMatchingPost.setCategory(findCategory);
        Member findMember = memberRepository.findById(1L).get();
        newMatchingPost.setMember(findMember);
        newMatchingPost.setPostName("야구할ㄹ사람");
        newMatchingPost.setPostContents("가가가작자갖갖가작자갖가작작");

        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-mm-ss");
        newMatchingPost.setMatchingDate(formatter.parse("2022-06-18"));

        formatter = new SimpleDateFormat("HH:mm:ss");
        newMatchingPost.setMatchingTime(formatter.parse("19:30:00"));

        newMatchingPost.setRecommendedSkill("아무나 들어오셈");
        newMatchingPost.setMaxNumberOfPeople(10);
        newMatchingPost.setPlace("대구광역시 달성군");

        matchingPostRepository.save(newMatchingPost);
    }
}