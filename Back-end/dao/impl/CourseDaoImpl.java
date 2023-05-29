package dao.impl;

import dao.CourseDao;
import dao.SubjectDao;
import datamock.CourseMock;
import model.Course;
import model.Subject;

import java.util.List;
import java.util.Random;

import static datamock.CourseMock.getCourseMock;

public class CourseDaoImpl implements CourseDao {

    SubjectDao subjectDao = new SubjectDaoImpl();
    @Override
    public List<Course> getAllCourse() {
        return getCourseMock();
    }

    @Override
    public boolean addCourse(Course course) {
        course.setId(new Random().nextInt(999));
        try{
            CourseMock.getCourseMock().add(course);
            return true;
        }catch (Exception e){
            return false;
        }
    }

    @Override
    public boolean removeCourse(int id) {
        try {
            CourseMock.getCourseMock().remove(getIndexById(id));
            return true;
        }catch (Exception e){
            return false;
        }
    }

    @Override
    public boolean updateCourse(Course course) {
        return false;
    }


    @Override
    public Course getCourseById(int idCurso) {
        return CourseMock.getCourseMock().get(getIndexById(idCurso));
    }

    @Override
    public boolean addSubjectToCourse(Integer courseId, Integer subjectId) {
        try {
            Course course = CourseMock.getCourseMock().get(getIndexById(courseId));
            Subject subject = subjectDao.getSubjectById(subjectId);
            course.getSubjects().add(subject);
            return true;
        }catch (Exception e){
            throw new RuntimeException(e);
        }
    }

    @Override
    public boolean removeSubjectFromCourse(Integer subjectId, Integer courseId) {
        try {
            Course course = CourseMock.getCourseMock().get(getIndexById(courseId));
            int indexSubject = getIndexSubjectById(subjectId, course);
            course.getSubjects().remove(indexSubject);
            return true;
        }catch (Exception e){
            throw new RuntimeException(e);
        }
    }

    public int getIndexById(int idCurso){
        int i = 0;
        for ( Course course: CourseMock.getCourseMock()) {
            if(course.getId()==idCurso){ return i;}
            i++;
        }
        return i;
    }

    public int getIndexSubjectById(int idSubject, Course course){
        int i = 0;
        for ( Subject subject: course.getSubjects()) {
            if(subject.getId()==idSubject){ return i;}
            i++;
        }
        return i;
    }



//    @Override
//    public boolean updateCourse(Course user) {
//        UserMock.getUsersMock().get(user.getId()-1).setName(user.getName());
//        UserMock.getUsersMock().get(user.getId()-1).setRole(user.getRole());
//        UserMock.getUsersMock().get(user.getId()-1).setPassword(user.getPassword());
//        UserMock.getUsersMock().get(user.getId()-1).setUsername(user.getUsername());
//        return true;
//    }
}
