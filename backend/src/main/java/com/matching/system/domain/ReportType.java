package com.matching.system.domain;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum ReportType {
    매칭공고("매칭공고"),
    회원("회원"),
    채팅("채팅")
    ;

    private final String code;

}
