package model;

import org.json.JSONObject;
import state.userstate.NotLoggedState;
import state.userstate.UserState;

public class User {

    private UserState stateLogin = new NotLoggedState();
    private int id;
    private String name;
    private String role;
    private String username;
    private String password;

    public User(int id, String name, String role, String username, String password) {
        this.id = id;
        this.name = name;
        this.role = role;
        this.username = username;
        this.password = password;
    }
    public User(String name, String role, String username, String password) {
        this.id = id;
        this.name = name;
        this.role = role;
        this.username = username;
        this.password = password;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public UserState getStateLogin() {
        return stateLogin;
    }

    public void setStateLogin(UserState stateLogin) {
        this.stateLogin = stateLogin;
    }

    public void nextState() {
        this.stateLogin.next(this);
    }
    public void printStatus() {
        this.stateLogin.printStatus();
    }

    public JSONObject getJsonString() {
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("id", this.id);
        jsonObject.put("name", this.name);
        jsonObject.put("role", this.role);
        jsonObject.put("username", this.username);
        return jsonObject;
    }
}
