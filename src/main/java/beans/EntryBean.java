package beans;

import entities.Entry;
import entities.attributes.EntryStatus;
import lombok.Data;
import repository.EntryRepository;
import utils.EntryChecker;
import utils.EntryFactory;

import javax.ejb.EJB;

@Data
public class EntryBean {

    @EJB
    private EntryRepository entryRepository;

    @EJB
    private EntryFactory entryFactory;

    @EJB
    private EntryChecker entryChecker;

    private Double x = 0.0;
    private Double y = 0.0;
    private Double r = 1.0;
    private EntryStatus status = EntryStatus.NOT_CALCULATED;

    public EntryStatus check() {
        return entryChecker.check(entryFactory.buildEntry(this)) ?
                EntryStatus.INCLUDED :
                EntryStatus.EXCLUDED;

    }

    public String save() {
        this.status = check();
        Entry entry = entryFactory.buildEntry(this);
        entryRepository.save(entry);
        return "success";
    }



}
