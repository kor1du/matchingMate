package com.matching.system.dto;

import com.matching.system.domain.RoleType;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MemberAuthorityDTO {
    private Long id;
    private RoleType roleType;

}
