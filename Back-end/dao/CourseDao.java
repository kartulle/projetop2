package dao;

import model.Course;
import model.User;

import java.util.List;

public interface CourseDao {
    public List<Course> getAllCourse();

    public boolean addCourse(Course course);

    public boolean removeCourse(int id);

    public boolean updateCourse(Course course);

    public Course getCourseById(int idCurso);

    boolean addSubjectToCourse(Integer courseId, Integer subjectId);

    boolean removeSubjectFromCourse(Integer subjectId, Integer courseId);
}
