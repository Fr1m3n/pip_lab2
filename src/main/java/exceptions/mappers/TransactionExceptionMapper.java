package exceptions.mappers;

import exceptions.UserLoginDuplicateException;
import exceptions.UserNotFoundException;
import exceptions.UserWrongPasswordException;

import javax.ejb.EJBTransactionRolledbackException;
import javax.ws.rs.core.Response;
import javax.ws.rs.ext.ExceptionMapper;
import javax.ws.rs.ext.Provider;

@Provider
public class TransactionExceptionMapper implements ExceptionMapper<EJBTransactionRolledbackException> {
    @Override
    public Response toResponse(EJBTransactionRolledbackException e) {
        Throwable ex = e.getCause();
        if (ex instanceof UserWrongPasswordException) {
            return Response.status(Response.Status.BAD_REQUEST)
                    .entity("Wrong password")
                    .build();
        } else if (ex instanceof UserNotFoundException) {
            return Response
                    .status(Response.Status.NOT_FOUND)
                    .entity("User doesn't found")
                    .build();
        } else if (ex instanceof UserLoginDuplicateException) {
            return Response
                    .status(Response.Status.BAD_REQUEST)
                    .entity("Login ZANYAT")
                    .build();
        } else {
            return Response
                    .status(Response.Status.INTERNAL_SERVER_ERROR)
                    .entity(e.getCause().getMessage())
                    .build();
        }
    }
}
