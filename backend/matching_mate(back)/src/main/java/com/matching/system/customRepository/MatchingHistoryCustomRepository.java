package com.matching.system.customRepository;

import com.matching.system.dto.MatchingHistoryDTO;

import java.util.List;

public interface MatchingHistoryCustomRepository {

    List<MatchingHistoryDTO.ChartData> monthlyMatchingCount(Long memberId);

    List<MatchingHistoryDTO.ChartData> categoryDistribution(Long memberId);
}
