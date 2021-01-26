package repository;

import entities.Entry;
import entities.User;

import javax.ejb.Stateless;
import javax.enterprise.inject.Default;
import javax.persistence.*;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.transaction.Transactional;
import java.util.List;

@Stateless(name = "entry_repo")
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

    @Override
    public List<Entry> findAllByUser(User user) {
        return em.createQuery("SELECT e FROM entities.Entry e WHERE e.user.id=?1")
                .setParameter(1, user.getId())
                .getResultList();
    }
}
