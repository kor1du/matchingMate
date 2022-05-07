package com.matching.system.config;

import com.matching.system.control.jwt.util.JwtTokenUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@RequiredArgsConstructor
@Component
public class AccessConfig {
    private final JwtTokenUtil jwtTokenUtil;

    public boolean isNormal(String realUserId, String accessToken) {
        String userId = jwtTokenUtil.getUserId(accessToken.substring(7));

        if (! realUserId.equals(userId))
            return false;

        return true;
    }
}
