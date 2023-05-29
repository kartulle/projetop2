package model;

public class Time {
    public String dayName;
    public int hour;

    public Time(String day, int hour) {
        this.dayName = day;
        this.hour = hour;
    }

    public String getDayName() {
        return dayName;
    }

    public void setDayName(String dayName) {
        this.dayName = dayName;
    }

    public int getHour() {
        return hour;
    }

    public void setHour(int hour) {
        this.hour = hour;
    }
}
