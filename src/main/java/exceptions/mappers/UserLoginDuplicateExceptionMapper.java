package exceptions.mappers;

import exceptions.UserLoginDuplicateException;

import javax.ws.rs.core.Response;
import javax.ws.rs.ext.ExceptionMapper;
import javax.ws.rs.ext.Provider;

@Provider
public class UserLoginDuplicateExceptionMapper implements ExceptionMapper<UserLoginDuplicateException> {
    @Override
    public Response toResponse(UserLoginDuplicateException e) {
        return Response
                .status(Response.Status.BAD_REQUEST)
                .entity("Login ZANYAT")
                .build();
    }
}
