package repository;

import entities.Entry;
import entities.User;

import java.util.List;

public interface EntryRepository {

    void save(Entry e);

    List<Entry> findAll();

    List<Entry> findAllByUser(User user);

}
