package utils;

import beans.EntryBean;
import entities.Entry;

import javax.ejb.Stateless;

@Stateless
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
