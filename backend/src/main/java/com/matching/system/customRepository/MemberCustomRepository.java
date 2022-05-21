package com.matching.system.customRepository;

import com.matching.system.dto.MemberDTO;

import java.util.List;
import java.util.Optional;

public interface MemberCustomRepository {

    Optional<MemberDTO.ReadMemberInfoDTO> findById(Long memberId);

    List<MemberDTO.ReadMemberInfoDTO> findAllUser(String roleType);

    Optional<MemberDTO.CheckDuplicateId> findByUserId(String userId);
}
