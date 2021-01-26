package controllers;

import entities.Entry;
import entities.User;
import services.AuthService;
import services.EntryService;
import services.EntryValidator;

import javax.ejb.EJB;
import javax.ejb.Singleton;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.Optional;

@Path("/entry")
@Singleton
public class EntryController {

    @EJB
    private AuthService authService;

    @EJB
    private EntryService entryService;

    @EJB
    private EntryValidator entryValidator;

    @POST
    @Path("")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response newEntry(Entry entry,
                             @HeaderParam("token") String token) {
        if (token == null) {
            return Response
                    .status(Response.Status.UNAUTHORIZED)
                    .build();
        }
        Optional<User> userOptional = authService.isAuthenticated(token);
        if (userOptional.isPresent()) {
            if (entryValidator.isValid(entry)) {
                entryService.save(entry, userOptional.get());
                return Response
                        .ok()
                        .build();
            } else {
                return Response
                        .status(Response.Status.BAD_REQUEST)
                        .build();
            }
        } else {
            return Response
                    .status(Response.Status.FORBIDDEN)
                    .build();
        }
    }

    @GET
    @Path("")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAllEntriesForUser(@HeaderParam("token") String token) {
        Optional<User> userOptional = authService.isAuthenticated(token);
        if (token == null) {
            return Response
                    .status(Response.Status.UNAUTHORIZED)
                    .build();
        }
        if (userOptional.isPresent()) {
            return Response
                    .ok()
                    .entity(entryService.findAllByUser(userOptional.get()))
                    .build();
        } else {
            return Response
                    .status(Response.Status.FORBIDDEN)
                    .build();
        }
    }

}
