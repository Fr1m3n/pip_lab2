import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.ws.rs.ApplicationPath;
import javax.ws.rs.core.Application;
import java.util.HashSet;
import java.util.Set;

@ApplicationPath("")
public class FrontApplication extends Application {

    private Set<Object> singletons = new HashSet<>();

    public FrontApplication() {
        try {
            InitialContext ic = new InitialContext();
            this.singletons.add(ic.lookup("java:module/StaticController"));
        } catch (NamingException e) {
            System.err.println(e.toString());
        }
    }

    @Override
    public Set<Object> getSingletons() {
        return singletons;
    }
}
