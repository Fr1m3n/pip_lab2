package services;

import entities.Entry;
import entities.User;

import java.util.List;

public interface EntryService {

    void save(Entry entry, User user);

    List<Entry> findAllByUser(User user);

}
