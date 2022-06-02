package com.matching.system.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

public class MatchingHistoryDTO {

    @Builder
    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class ReadMatchingHistoryDTO {
        private Long id;
        private String matchedDatetime;
        private MatchingPostDTO.ReadDetailMatchingPostDTO matchingPostDTO;
        List<MemberDTO.HistoryMemberDTO> historyMembers;
    }

    @Builder
    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class ChartData {
        private String label;
        private Long data;
    }

    @Getter
    @AllArgsConstructor
    public static class ChartDataProcess {
        private List<String> labelList;
        private List<String> dataList;
    }


}
