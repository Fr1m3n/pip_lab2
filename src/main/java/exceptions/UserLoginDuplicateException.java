package exceptions;

public class UserLoginDuplicateException extends RuntimeException {

    public UserLoginDuplicateException(String message) {
        super(message);
    }

}
