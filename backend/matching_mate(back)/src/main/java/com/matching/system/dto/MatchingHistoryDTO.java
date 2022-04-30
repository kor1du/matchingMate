package com.matching.system.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.matching.system.domain.MatchingHistory;
import com.matching.system.domain.MatchingPost;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import java.util.Date;
import java.util.List;

@Builder
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class MatchingHistoryDTO {

    private Long id;
    private Date matchedDatetime;
    private MatchingPostDTO.ReadDTO matchingPostDTO;
    List<MemberDTO.HistoryMemberDTO> historyMembers;

    public void addHistoryMember(List<MemberDTO.HistoryMemberDTO> historyMembers)
    {
        this.historyMembers = historyMembers;
    }

}
