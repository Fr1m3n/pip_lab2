package utils;

import beans.EntryBean;
import dao.Entry;

import javax.faces.bean.ApplicationScoped;
import javax.faces.bean.ManagedBean;

@ManagedBean(name = "entryFactory")
@ApplicationScoped
public class EntryFactory {

    public Entry buildEntry(EntryBean bean) {
        Entry res = new Entry();
        res.setX(bean.getX());
        res.setY(bean.getY());
        res.setR(bean.getR());
        res.setStatus(bean.getStatus());
        return res;
    }

}
