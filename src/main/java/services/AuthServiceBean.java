package services;

import com.google.common.hash.Hashing;
import entities.User;
import exceptions.UserLoginDuplicateException;
import exceptions.UserNotFoundException;
import exceptions.UserWrongPasswordException;
import org.postgresql.util.PSQLException;
import repository.UserRepository;

import javax.ejb.EJB;
import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.PersistenceException;
import javax.transaction.Transactional;
import javax.validation.ConstraintViolationException;
import java.nio.charset.StandardCharsets;
import java.util.Optional;

@Stateless
public class AuthServiceBean implements AuthService {

    private static final String SALT = "sOmEbody once TOLD ME";

    @EJB
    private JwtManager jwtManager;

    @Inject
    private UserRepository userRepository;

    @PersistenceContext(unitName = "Entry")
    private EntityManager em;

    @Override
    public String login(User user) {
        User userFromDB = userRepository.findByLogin(user.getLogin());
        if (userFromDB.getPassword().equals(hash(user.getPassword()))) {
            return jwtManager.generate(user);
        } else {
            throw new UserWrongPasswordException("Wrong password.");
        }
    }

    @Override
//    @Transactional
    public void register(User user) {
        user.setPassword(hash(user.getPassword()));
        try {
            userRepository.findByLogin(user.getLogin());
            userRepository.save(user);
        } catch (UserNotFoundException e) {
            throw new UserLoginDuplicateException("Login ZANYAT");
        }
    }

    @Override
    public Optional<User> isAuthenticated(String jwt) {
        String subject = jwtManager.getSubject(jwt);
        try {
            return Optional.of(userRepository.findByLogin(subject));
        } catch (UserNotFoundException e) {
            System.err.println(e.getMessage());
            return Optional.empty();
        }
    }

    private String hash(String pass) {
        return Hashing.sha256()
                .hashString(pass, StandardCharsets.UTF_8)
                .toString();

    }

}
