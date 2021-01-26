package services;

import entities.User;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

import javax.ejb.Stateless;
import java.security.Key;

@Stateless(name = "jwt_manager")
public class JwtManagerBean implements JwtManager {

    private static Key secretKey = null;

    public JwtManagerBean() {
        if (secretKey == null) {
            secretKey = Keys.secretKeyFor(SignatureAlgorithm.HS256);
        }
    }

    @Override
    public String generate(User user) {
        return Jwts.builder()
                .setSubject(user.getLogin())
                .signWith(secretKey)
                .compact();
    }

    @Override
    public String getSubject(String jwt) {
        return Jwts.parserBuilder()
                .setSigningKey(secretKey)
                .build()
                .parseClaimsJws(jwt)
                .getBody()
                .getSubject();
    }

}
