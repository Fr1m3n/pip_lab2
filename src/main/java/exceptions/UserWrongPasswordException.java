package exceptions;

public class UserWrongPasswordException extends RuntimeException {

    public UserWrongPasswordException(String message) {
        super(message);
    }
}
