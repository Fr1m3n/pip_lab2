package beans;

import dao.Entry;
import dao.EntryStatus;
import lombok.Data;
import repository.EntryRepository;
import utils.EntryChecker;
import utils.EntryFactory;

import javax.faces.bean.ManagedBean;
import javax.faces.bean.SessionScoped;
import javax.inject.Inject;

@Data
@ManagedBean(name = "entry")
@SessionScoped
public class EntryBean {

    @Inject
    private EntryRepository entryRepository;

    @Inject
    private EntryFactory entryFactory;

    @Inject
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
