package datamock;

import model.Course;

import java.util.ArrayList;
import java.util.List;

public class CourseMock {
    private static List<Course> courseMock = new ArrayList<>();

    public static List<Course> getCourseMock(){
        return courseMock;
    }
}
