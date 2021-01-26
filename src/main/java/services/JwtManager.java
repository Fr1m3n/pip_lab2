package services;

import entities.User;

public interface JwtManager {

    String generate(User user);

    String getSubject(String jwt);
}
