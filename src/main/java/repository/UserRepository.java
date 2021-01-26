package repository;

import entities.User;

public interface UserRepository {

    void save(User user);

    User findByLogin(String login);

}
