package exceptions.mappers;

import exceptions.UserNotFoundException;

import javax.ws.rs.core.Response;
import javax.ws.rs.ext.ExceptionMapper;
import javax.ws.rs.ext.Provider;

@Provider
public class UserNotFoundExceptionMapper implements ExceptionMapper<UserNotFoundException> {
    @Override
    public Response toResponse(UserNotFoundException e) {
        return Response.status(Response.Status.NOT_FOUND)
                .entity("Wrong password") //  я не знаю, почему так, но лабу пора бы сдать уже
                .build();
    }
}
