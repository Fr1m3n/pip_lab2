package repository;

import entities.User;
import exceptions.UserLoginDuplicateException;
import exceptions.UserNotFoundException;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import javax.transaction.Transactional;
import javax.validation.ConstraintViolationException;

@Stateless
public class UserRepositoryImpl implements UserRepository {

    @PersistenceContext
    private EntityManager em;

    @Transactional
    @Override
    public void save(User user) {
        try {
            em.persist(user);
            em.flush();
        } catch (ConstraintViolationException e) {
            throw new UserLoginDuplicateException(e.getMessage());
        }
    }

    @Override
    public User findByLogin(String login) {
        try {
            TypedQuery<User> query = em
                    .createQuery("SELECT u FROM User u WHERE u.login=?1", User.class);
            query.setParameter(1, login);
            return query.getSingleResult();
        } catch (NoResultException e) {
            throw new UserNotFoundException("User with that login doesn't presented.");
        }
    }
}
