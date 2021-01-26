package services;

import entities.Entry;
import entities.User;
import entities.attributes.EntryStatus;
import repository.EntryRepository;
import utils.EntryChecker;

import javax.ejb.EJB;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@Stateless
public class EntryServiceBean implements EntryService {

    @EJB
    private EntryRepository entryRepository;

    @EJB
    private EntryChecker entryChecker;

    @Override
    public void save(Entry entry, User user) {
        entry.setUser(user);
        entry.setStatus(entryChecker.check(entry) ? EntryStatus.INCLUDED : EntryStatus.EXCLUDED);
        entryRepository.save(entry);
    }

    @Override
    public List<Entry> findAllByUser(User user) {
        return entryRepository.findAllByUser(user);
    }
}
