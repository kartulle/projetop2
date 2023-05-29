package service;

import model.Course;
import model.User;

public interface CourseService {

    public String getAllCourse();

    public String getSubjects(int idCurso);

    public boolean createCourse(Course course);

    public boolean updateCourse(int idCourse, Course course);

    public boolean removeCourse(int idUser);


    public boolean addSubjectToCourse(Integer courseId, Integer subjectId);

    public boolean removeSubjectFromCourse(Integer subjectId, Integer courseId);
}
