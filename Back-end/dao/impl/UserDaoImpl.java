package dao.impl;

import dao.UserDao;
import datamock.CourseMock;
import datamock.UserMock;
import model.Course;
import model.User;

import java.util.List;
import java.util.Random;

import static datamock.UserMock.getUsersMock;

public class UserDaoImpl implements UserDao {




    @Override
    public List<User> getAllUsers() {
        return getUsersMock();
    }

    @Override
    public boolean addUser(User user) {
        user.setId(new Random().nextInt(999));
        try{
            UserMock.getUsersMock().add(user);
            return true;
        }catch (Exception e){
            return false;
        }
    }

    @Override
    public boolean removeUser(int idUser) {
        try {
            UserMock.getUsersMock().remove(getIndexById(idUser));
            return true;
        }catch (Exception e){
            return false;
        }
    }

    @Override
    public boolean updateUser(User user) {
        UserMock.getUsersMock().get(getIndexById(user.getId())).setName(user.getName());
        UserMock.getUsersMock().get(getIndexById(user.getId())).setRole(user.getRole());
        UserMock.getUsersMock().get(getIndexById(user.getId())).setPassword(user.getPassword());
        UserMock.getUsersMock().get(getIndexById(user.getId())).setUsername(user.getUsername());
        return true;
    }

    public int getIndexById(int idUser){
        int i = 0;
        for ( User user: UserMock.getUsersMock()) {
            if(user.getId()==idUser){ return i;}
            i++;
        }
        return i;
    }
}
