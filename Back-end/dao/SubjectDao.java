package dao;

import model.Course;
import model.Subject;

import java.util.List;

public interface SubjectDao {
    public List<Subject> getAllSubject();

    public boolean addSubject(Subject subject);

    public boolean removeSubject(int id);

    public boolean updateSubject(Subject subject);

    Subject getSubjectById(Integer subjectId);
}
