package com.matching.system.jwt.util;

import com.matching.system.jwt.JwtExpirationEnums;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;


@Component
public class JwtTokenUtil {

    private final Logger logger = LoggerFactory.getLogger(JwtTokenUtil.class);

    @Value("${spring.jwt.secret}")
    private String SECRET_KEY;
//    @Value("${spring.jwt.token-validity-in-seconds}")
//    private long tokenValidityInMilliseconds;

    private Key key;

    public Claims extractAllClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSigningKey(SECRET_KEY))
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    public String getUserId(String token) {
        return extractAllClaims(token).get("userId", String.class);
    }

    public Long getMemberId(String token) {
        return extractAllClaims(token).get("memberId", Long.class);
    }

    private Key getSigningKey(String secretKey) {
        byte[] keyBytes = secretKey.getBytes(StandardCharsets.UTF_8);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    public String resolveToken(String token)
    {
        return token.substring(7);
    }

    public Boolean isTokenExpired(String token) {
        Date expiration = extractAllClaims(token).getExpiration();
        return expiration.before(new Date());
    }

    public String generateAccessToken(Long memberId, String userId) {
        return doGenerateToken(memberId, userId, JwtExpirationEnums.ACCESS_TOKEN_EXPIRATION_TIME.getValue());
    }

    public String generateRefreshToken(Long memberId, String userId) {
        return doGenerateToken(memberId, userId, JwtExpirationEnums.REFRESH_TOKEN_EXPIRATION_TIME.getValue());
    }

    private String doGenerateToken(Long memberId, String userId, long expireTime) {
        Claims claims = Jwts.claims();
        claims.put("memberId", memberId);
        claims.put("userId", userId);

        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + expireTime))
                .signWith(getSigningKey(SECRET_KEY), SignatureAlgorithm.HS256)
                .compact();
    }

    public Boolean validateToken(String token, UserDetails userDetails) {
       String userId = getUserId(token);

        return userId.equals(userDetails.getUsername())
                && !isTokenExpired(token);
    }

    public long getRemainMilliSeconds(String token) {
        Date expiration = extractAllClaims(token).getExpiration();
        Date now = new Date();
        return expiration.getTime() - now.getTime();
    }



//    public JwtTokenUtil(
//            @Value("${spring.jwt.secret}") String secret,
//            @Value("${spring.jwt.token-validity-in-seconds}") long tokenValidityInSeconds) {
//        this.secret = secret;
//        this.tokenValidityInMilliseconds = tokenValidityInSeconds * 1000;
//    }
//
//    @Override
//    public void afterPropertiesSet() {
//        byte[] keyBytes = Decoders.BASE64.decode(secret);
//        this.key = Keys.hmacShaKeyFor(keyBytes);
//    }
//
//    public String createToken(Authentication authentication) {
//        String authorities = authentication.getAuthorities().stream()
//                .map(GrantedAuthority::getAuthority)
//                .collect(Collectors.joining(","));
//
//        long now = (new Date()).getTime();
//        Date validity = new Date(now + this.tokenValidityInMilliseconds);
//
//        return Jwts.builder()
//                .setSubject(authentication.getName())
//                .claim(AUTHORITIES_KEY, authorities)
//                .signWith(key, SignatureAlgorithm.HS512)
//                .setExpiration(validity)
//                .compact();
//    }
//
//    public Authentication getAuthentication(String token) {
//        Claims claims = Jwts
//                .parserBuilder()
//                .setSigningKey(key)
//                .build()
//                .parseClaimsJws(token)
//                .getBody();
//
//        Collection<? extends GrantedAuthority> authorities =
//                Arrays.stream(claims.get(AUTHORITIES_KEY).toString().split(","))
//                        .map(SimpleGrantedAuthority::new)
//                        .collect(Collectors.toList());
//
//        User principal = new User(claims.getSubject(), "", authorities);
//
//        return new UsernamePasswordAuthenticationToken(principal, token, authorities);
//    }
//
//    public boolean validateToken(String token) {
//        try {
//            Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
//            return true;
//        } catch (io.jsonwebtoken.security.SecurityException | MalformedJwtException e) {
//            logger.info("잘못된 JWT 서명입니다.");
//        } catch (ExpiredJwtException e) {
//            logger.info("만료된 JWT 토큰입니다.");
//        } catch (UnsupportedJwtException e) {
//            logger.info("지원되지 않는 JWT 토큰입니다.");
//        } catch (IllegalArgumentException e) {
//            logger.info("JWT 토큰이 잘못되었습니다.");
//        }
//        return false;
//    }
}