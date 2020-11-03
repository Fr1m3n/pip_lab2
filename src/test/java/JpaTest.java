import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;

import dao.Entry;
import dao.EntryStatus;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import java.util.List;

public class JpaTest {

    private EntityManager em;

    @Before
    public void before() {
        EntityManagerFactory emf = Persistence.createEntityManagerFactory("Entry");
        em = emf.createEntityManager();
        em.getTransaction().begin();
    }

    @After
    public void after() {
        if (em.getTransaction().isActive()) {
            em.getTransaction().commit();
        }
        em.getEntityManagerFactory().close();
        em.close();
    }

    @Test
    public void createNewEntryTest() {
        Entry entry = new Entry();
        entry.setR(1.0);
        entry.setX(1.0);
        entry.setY(1.0);
        entry.setStatus(EntryStatus.EXCLUDED);

        em.persist(entry);

    }

    @Test
    public void getEntriesTest() {
        createNewEntryTest();
        CriteriaBuilder cb = em.getCriteriaBuilder();
        CriteriaQuery<Entry> query = cb.createQuery(Entry.class);
        query.select(query.from(Entry.class));
        List<Entry> entries = em.createQuery(query).getResultList();
        System.out.println(entries);
    }
}
