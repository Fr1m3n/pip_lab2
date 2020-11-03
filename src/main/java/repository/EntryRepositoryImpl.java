package repository;

import dao.Entry;

import javax.enterprise.context.ApplicationScoped;
import javax.enterprise.inject.Default;
import javax.faces.bean.ManagedBean;
import javax.persistence.*;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.transaction.Transactional;
import java.util.List;

@Default
@ManagedBean(name = "entry_repo", eager = true)
@ApplicationScoped
public class EntryRepositoryImpl implements EntryRepository {

    @PersistenceContext(unitName = "Entry")
    private EntityManager em;

//    public EntryRepositoryImpl() {
//
//        EntityManagerFactory emf = Persistence.createEntityManagerFactory("Entry");
//        em = emf.createEntityManager();
//    }

    @Override
    @Transactional
    public void save(Entry e) {
//        em.getTransaction().begin();
        em.persist(e);
        em.flush();
//        em.getTransaction().commit();
    }

    @Override
    public List<Entry> findAll() {
        CriteriaBuilder cb = em.getCriteriaBuilder();
        CriteriaQuery<Entry> query = cb.createQuery(Entry.class);
        query.select(query.from(Entry.class));
        return em.createQuery(query).getResultList();
    }
}
