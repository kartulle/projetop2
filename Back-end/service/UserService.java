package service;

import model.User;

import java.util.List;

public interface UserService {
    public String getAllUser();

    public boolean createUser(User user);

    public boolean updateUser(User user);

    public boolean removeUser(int idUser);



}
