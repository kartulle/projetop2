package service.impl;

import dao.UserDao;
import model.User;
import org.json.JSONArray;
import service.UserService;

import java.util.List;

public class UserServiceImpl implements UserService {

    private UserDao userDao;

    public UserServiceImpl(UserDao userDao) {
        this.userDao = userDao;
    }

    @Override
    public String getAllUser() {

        return getAllUsersJson(userDao.getAllUsers());
    }

    @Override
    public boolean createUser(User user) {
        return userDao.addUser(user);
    }

    @Override
    public boolean updateUser(User user) {
        return userDao.updateUser(user);
    }

    @Override
    public boolean removeUser(int idUser) {
        return userDao.removeUser(idUser);
    }

    static public String getAllUsersJson(List<User> users) {
        JSONArray jsonArray = new JSONArray();
        for (User user : users) {
            jsonArray.put(user.getJsonString());
        }
        return jsonArray.toString();
    }
}
