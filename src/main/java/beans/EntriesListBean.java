package beans;

import entities.Entry;
import lombok.Data;
import repository.EntryRepository;

import javax.annotation.PostConstruct;
import javax.ejb.EJB;
import java.util.List;


@Data
public class EntriesListBean {

    @EJB
    private EntryRepository entryRepository;

    private List<Entry> entries;

    public EntriesListBean() {
    }

    @PostConstruct
    public void init() {
        loadEntries();
    }

    public void loadEntries() {
        this.entries = entryRepository.findAll();
    }

    public List<Entry> getEntries() {
        loadEntries();
        return entries;
    }

    public static void main(String[] args) {

    }
}
