package service;

import model.Subject;

public interface SubjectService {
    public String getAllSubject();

    public boolean createSubject(Subject subject);

    public boolean updateSubject(Subject subject);

    public boolean removeSubject(int idUser);
}
