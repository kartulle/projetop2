package dao.impl;

import dao.SubjectDao;
import datamock.CourseMock;
import model.Course;
import datamock.SubjectMock;
import model.Subject;

import java.util.List;
import java.util.Random;

import static datamock.SubjectMock.getSubjectsMock;

public class SubjectDaoImpl implements SubjectDao {
    @Override
    public List<Subject> getAllSubject() {
        return getSubjectsMock();
    }

    @Override
    public boolean addSubject(Subject subject) {
        subject.setId(new Random().nextInt(999));
        try{
            getSubjectsMock().add(subject);
            return true;
        }catch (Exception e){
            return false;
        }
    }

    @Override
    public boolean removeSubject(int id) {
        try {
            getSubjectsMock().remove(getIndexById(id));
            return true;
        }catch (Exception e){
            return false;
        }
    }

    @Override
    public boolean updateSubject(Subject subject) {
        return false;
    }

    @Override
    public Subject getSubjectById(Integer subjectId) {
        return SubjectMock.getSubjectsMock().get(getIndexById(subjectId));
    }

    public int getIndexById(int idSubject){
        int i = 0;
        for ( Subject subject: getSubjectsMock()) {
            if(subject.getId()==idSubject){ return i;}
            i++;
        }
        return i;
    }

}
