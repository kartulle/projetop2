package oldfiles;

import java.util.ArrayList;

public class Time {
    public String day;
    public int hour;

    public Time(String day, int hour) {
        this.day = day;
        this.hour = hour;
    }

    static public boolean timeInArray(Time time, ArrayList<Time> times){
        for(Time element: times){
            if(time.day.equals(element.day) && time.hour == element.hour){
                return true;
            }
        }
        return false;
    }

    static public boolean timeIsEqual(ArrayList<Time> timesTarget, ArrayList<Time> times){
        for(Time time: timesTarget){
            if(!Time.timeInArray(time, times)){
                return false;
            }  
        }
        return true;
    }
}
