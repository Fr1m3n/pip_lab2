package repository;

import dao.Entry;

import java.util.List;

public interface EntryRepository {

    void save(Entry e);

    List<Entry> findAll();

}
