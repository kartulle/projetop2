package service.impl;

import dao.UserDao;
import model.User;
//import oldfiles.User as Userold;
import service.AuthService;

public class AuthServiceImpl implements AuthService {

    UserDao userDao;

    public AuthServiceImpl(UserDao userDao) {
        this.userDao = userDao;
    }

    @Override
    public User authenticateUser(String username,String password) {
        for (User user: userDao.getAllUsers()) {
            System.out.println(user.getName()+":");
            user.printStatus();
            if (user.getUsername().equals(username) && user.getPassword().equals(password)){
                user.nextState();
                user.printStatus();
                return user;
            }
        }
        return null;
    }
}
