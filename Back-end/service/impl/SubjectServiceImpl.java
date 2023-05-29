package service.impl;

import dao.SubjectDao;
import model.Subject;
import model.User;
import org.json.JSONArray;
import service.SubjectService;

import java.util.List;

public class SubjectServiceImpl implements SubjectService {

    SubjectDao subjectDao;

    public SubjectServiceImpl(SubjectDao subjectDao) {
        this.subjectDao = subjectDao;
    }

    @Override
    public String getAllSubject() {
        return getAllSubjectJson(subjectDao.getAllSubject());
    }

    @Override
    public boolean createSubject(Subject subject) {
        return subjectDao.addSubject(subject);
    }

    @Override
    public boolean updateSubject(Subject subject) {
        return subjectDao.updateSubject(subject);
    }

    @Override
    public boolean removeSubject(int idSubject) {
        return subjectDao.removeSubject(idSubject);
    }

    static public String getAllSubjectJson(List<Subject> subjects) {
        JSONArray jsonArray = new JSONArray();
        for (Subject subject : subjects) {
            jsonArray.put(subject.getJsonString());
        }
        return jsonArray.toString();
    }

}
