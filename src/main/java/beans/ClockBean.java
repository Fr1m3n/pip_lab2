package beans;

import lombok.Data;

import javax.faces.bean.ManagedBean;
import javax.faces.bean.ViewScoped;
import java.time.LocalDateTime;

@ManagedBean(name = "clock")
@ViewScoped
@Data
public class ClockBean {

    private Integer hour;
    private Integer minute;
    private Integer second;

    public ClockBean() {
        updateTime();
    }

    public void updateTime() {
        LocalDateTime time = LocalDateTime.now();
        this.hour = time.getHour();
        this.minute = time.getMinute();
        this.second = time.getSecond();
    }

    public String getTime() {
        StringBuilder sb = new StringBuilder();
        if (hour < 10) {
            sb.append('0');
        }
        sb.append(hour).append(':');
        if (minute < 10) {
            sb.append('0');
        }
        sb.append(minute).append(':');
        if (second < 10) {
            sb.append('0');
        }
        sb.append(second);
        return sb.toString();
    }

}
