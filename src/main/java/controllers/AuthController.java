package controllers;

import dto.JwtDTO;
import entities.User;
import services.AuthService;
import services.JwtManager;

import javax.ejb.EJB;
import javax.ejb.Singleton;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;


@Singleton
@Path("/auth")
public class AuthController {

    @EJB
    private JwtManager jwtManager;

    @EJB
    private AuthService authService;

    @PersistenceContext(unitName = "Entry")
    private EntityManager em;

    public AuthController() {
    }

    /**
     * @return
     */
    @GET
    @Path("/login")
    @Produces(MediaType.APPLICATION_JSON)
    public Response login(@QueryParam("login") String login,
                          @QueryParam("password") String password) {
        User user = new User(login, password);
        String jwt = authService.login(user);
        return Response.ok()
                .entity(new JwtDTO(jwt))
                .build();
    }

    @POST
    @Path("/register")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response register(User user) {
        authService.register(user);
        return Response.ok().build();
    }
}
