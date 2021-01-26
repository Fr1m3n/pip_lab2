package utils;

import entities.Entry;

import javax.ejb.Stateless;


@Stateless
public class EntryChecker {

    public boolean check(Entry entry) {
        Entry newEntry = new Entry();
        newEntry.setX(entry.getX());
        newEntry.setY(entry.getY());
        newEntry.setR(entry.getR());
        if (newEntry.getR() < 0) {
            newEntry.setX(-newEntry.getX());
            newEntry.setY(-newEntry.getY());
            newEntry.setR(-newEntry.getR());
        }
        if (newEntry.getX() >= 0) {
            if (newEntry.getY() >= 0) {
                return check1(newEntry);
            } else {
                return check4(newEntry);
            }
        } else {
            if (newEntry.getY() > 0) {
                return check2(newEntry);
            } else {
                return check3(newEntry);
            }
        }
    }

    private boolean check1(Entry entry) {
        return Math.sqrt(entry.getX() * entry.getX() + entry.getY() * entry.getY()) <= entry.getR();
    }

    private boolean check2(Entry entry) {
        return false;
    }

    private boolean check3(Entry entry) {
        Double x = entry.getX();
        Double y = entry.getY();
        Double r = entry.getR();
        return x == 0 && y >= -r ||
                y == 0 && x >= -r / 2 ||
                y >= -x - (r / 2);
    }

    private boolean check4(Entry entry) {
        return entry.getX() <= entry.getR() / 2 &&
                entry.getY() >= -entry.getR();
    }

}
