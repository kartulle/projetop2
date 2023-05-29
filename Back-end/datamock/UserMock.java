package datamock;

import model.User;

import java.util.ArrayList;
import java.util.List;

public class UserMock {
    private static List<User> usersMock = new ArrayList<>();

    public static List<User> getUsersMock(){
        return usersMock;
    }

}
