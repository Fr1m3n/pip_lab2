package services;

import entities.Entry;

import javax.ejb.Singleton;
import javax.ejb.Stateless;

@Singleton
public class EntryValidatorImpl implements EntryValidator {

    @Override
    public boolean isValid(Entry entry) {
        return inRange(entry.getR(), -4.0, 4.0) &&
                inRange(entry.getX(), -4.0, 4.0) &&
                inRange(entry.getY(), -5.0, 3.0);
    }

    /**
     * Проверяет, находится ли число на отрезке [{@code left}, {@code right}]
     * @param var Проверяемое число
     * @param left Левая граница (включительно)
     * @param right Правая граница (включительно)
     * @return входи ли???
     */
    private boolean inRange(Double var, Double left, Double right) {
        return var >= left && var <= right;
    }

}
