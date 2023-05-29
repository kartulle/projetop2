package datamock;

import model.Subject;
import model.Time;

import java.util.ArrayList;
import java.util.List;

public class SubjectMock {
    private static List<Subject> subjectMock = new ArrayList<>();

    public static List<Subject> getSubjectsMock(){
        return subjectMock;
    }
}
