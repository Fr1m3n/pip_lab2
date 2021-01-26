package services;

import entities.User;
import exceptions.UserLoginDuplicateException;
import exceptions.UserNotFoundException;

import java.util.Optional;

public interface AuthService {

    String login(User user) throws UserNotFoundException;

    void register(User user) throws UserLoginDuplicateException;

    Optional<User> isAuthenticated(String jwt);

}
