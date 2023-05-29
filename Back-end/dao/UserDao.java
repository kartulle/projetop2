package dao;

import model.User;

import java.util.ArrayList;
import java.util.List;

public interface UserDao {
    public List<User> getAllUsers();
    public boolean addUser(User user);
    public boolean removeUser(int id);

    public boolean updateUser(User user);
}
