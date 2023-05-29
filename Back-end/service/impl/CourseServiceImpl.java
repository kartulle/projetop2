package service.impl;

import dao.CourseDao;
import model.Course;
import model.Subject;
import org.json.JSONArray;
import service.CourseService;

import java.util.List;

public class CourseServiceImpl implements CourseService {

    private CourseDao couserDao;

    public CourseServiceImpl(CourseDao couserDao) {
        this.couserDao = couserDao;
    }

    @Override
    public String getAllCourse() {

        return getAllUsersJson(couserDao.getAllCourse());
    }

    @Override
    public String getSubjects(int idCurso) {
        return getAllSubjectsJson(couserDao.getCourseById(idCurso));
    }




    @Override
    public boolean createCourse(Course course) {
        return couserDao.addCourse(course);
    }

    @Override
    public boolean updateCourse(int idCourse, Course course) {
        return couserDao.updateCourse(course);
    }

    @Override
    public boolean removeCourse(int idCourse) {
        return couserDao.removeCourse(idCourse);
    }

    @Override
    public boolean addSubjectToCourse(Integer courseId, Integer subjectId) {
        return couserDao.addSubjectToCourse(courseId, subjectId);
    }

    @Override
    public boolean removeSubjectFromCourse(Integer subjectId, Integer courseId) {
        return couserDao.removeSubjectFromCourse(subjectId,courseId);
    }

    static public String getAllUsersJson(List<Course> courses) {
        JSONArray jsonArray = new JSONArray();
        for (Course course : courses) {
            jsonArray.put(course.getJsonString());
        }
        return jsonArray.toString();
    }

    private String getAllSubjectsJson(Course course) {
        JSONArray jsonArray = new JSONArray();
        for (Subject subject : course.getSubjects()) {
            jsonArray.put(subject.getJsonString());
        }
        return jsonArray.toString();
    }

}
