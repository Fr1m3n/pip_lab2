package controllers;

import javax.ejb.Singleton;
import javax.inject.Inject;
import javax.servlet.ServletContext;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.core.Response;
import java.io.InputStream;
import java.util.Objects;

import static javax.ws.rs.core.Response.Status.NOT_FOUND;

@Singleton
@Path("")
public class StaticController {

    @Inject
    private ServletContext context;

    @GET
    @Path("{path: ^static/.*}")
    public Response staticResources(@PathParam("path") final String path) {
        System.out.println("Requested static file path: " + path);
        InputStream resource = context.getResourceAsStream(String.format("/WEB-INF/%s", path));

        return Objects.isNull(resource)
                ? Response.status(NOT_FOUND).build()
                : Response.ok().entity(resource).build();
    }

    @GET
    @Path("/{path: main|auth}")
    public Response reactApp() {
        InputStream app = context.getResourceAsStream("/WEB-INF/static/index.html");
        return Response.ok()
                .entity(app)
                .build();
    }

}
