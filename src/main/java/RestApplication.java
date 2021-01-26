import exceptions.mappers.UserLoginDuplicateExceptionMapper;
import exceptions.mappers.UserNotFoundExceptionMapper;
import exceptions.mappers.TransactionExceptionMapper;

import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.ws.rs.ApplicationPath;
import javax.ws.rs.core.Application;
import java.util.HashSet;
import java.util.Set;

@ApplicationPath("/api")
public class RestApplication extends Application {

    private Set<Object> singletons = new HashSet<>();

    public RestApplication() {
        try {
            InitialContext ic = new InitialContext();
            this.singletons.add(ic.lookup("java:module/AuthController"));
            this.singletons.add(ic.lookup("java:module/EntryController"));
            this.singletons.add(new UserLoginDuplicateExceptionMapper());
            this.singletons.add(new TransactionExceptionMapper());
            this.singletons.add(new UserNotFoundExceptionMapper());
//            this.singletons.add(ic.lookup("java:module/StaticController"));
        } catch (NamingException e) {
            System.err.println(e.toString());
        }
    }

    @Override
    public Set<Object> getSingletons() {
        return this.singletons;
    }
}
