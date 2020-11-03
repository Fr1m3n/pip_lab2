package dao;

import beans.EntryBean;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import java.io.Serializable;
import java.time.LocalDateTime;

@EqualsAndHashCode(callSuper = true)
@Data
@Entity
@NoArgsConstructor
public class Entry extends AbstractDao implements Serializable {

    private Double x;
    private Double y;
    private Double r;
    private EntryStatus status;
    private LocalDateTime creationTime = LocalDateTime.now();

}
