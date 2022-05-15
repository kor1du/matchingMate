package com.matching.system.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Builder
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class MatchingHistoryDTO {

    private Long id;
    private Date matchedDatetime;
    private MatchingPostDTO.ReadDetailMatchingPostDTO matchingPostDTO;
    List<MemberDTO.HistoryMemberDTO> historyMembers;

    public void addHistoryMember(List<MemberDTO.HistoryMemberDTO> historyMembers)
    {
        this.historyMembers = historyMembers;
    }

}
