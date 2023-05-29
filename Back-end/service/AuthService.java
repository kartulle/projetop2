package service;

import dao.UserDao;
import model.User;

public interface AuthService {

    public User authenticateUser(String username,String password);

}
