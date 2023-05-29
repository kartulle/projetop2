package web.rest;

import com.sun.net.httpserver.HttpExchange;
import dao.UserDao;
import dao.impl.UserDaoImpl;
import model.User;
import org.json.JSONObject;
import org.json.JSONTokener;
import service.UserService;
import service.impl.UserServiceImpl;

import java.io.InputStreamReader;

public class UserResource {
    UserDao userDao = new UserDaoImpl();
    UserService userService = new UserServiceImpl(userDao);

    public String getAllUser() {
        return userService.getAllUser();
    }

    public String createUser(HttpExchange exchange) {
        JSONObject responseJson = new JSONObject();
        try {
            InputStreamReader reader = new InputStreamReader(exchange.getRequestBody(), "utf-8");
            JSONObject json = new JSONObject(new JSONTokener(reader));
            String name = json.getString("name");
            String role = json.getString("role");
            String username = json.getString("username");
            String password = json.getString("password");
            if (name.isEmpty() || role.isEmpty() || username.isEmpty() || password.isEmpty()) {
                throw new IllegalArgumentException("Campos obrigatórios não foram preenchidos.");
            }
            if (userService.createUser(new User(name, role, username, password))) {
                responseJson.put("success", "User created");
            }
            return responseJson.toString();

        } catch (Exception e) {
            responseJson.put("error", "Não foi possivel criar usuario: " + e.getMessage());
            return responseJson.toString();
        }
    }

    public String updateUser(HttpExchange exchange) {
        JSONObject responseJson = new JSONObject();
        try {
            InputStreamReader reader = new InputStreamReader(exchange.getRequestBody(), "utf-8");
            JSONObject json = new JSONObject(new JSONTokener(reader));
            String uri = exchange.getRequestURI().toString();

            int idUser = Integer.parseInt(uri.substring(uri.lastIndexOf('/') + 1));

            User user = new User(idUser,
                    json.getString("name"),
                    json.getString("role"),
                    json.getString("username"),
                    json.getString("password")
            );
            userService.updateUser(user);

            responseJson.put("message", "Usuario " + user.getName() + " atualizado");
            return responseJson.toString();

        } catch (Exception e) {
            responseJson.put("error", "Não foi possivel atualizar usuario: " + e.getMessage());
            return responseJson.toString();
        }
    }

    public String deleteUser(HttpExchange exchange) {
        JSONObject responseJson = new JSONObject();
        try {
            String uri = exchange.getRequestURI().toString();
            int idUser = Integer.parseInt(uri.substring(uri.lastIndexOf('/') + 1));

            userService.removeUser(idUser);

            responseJson.put("message", "Usuario deletado");
            return responseJson.toString();
        } catch (Exception e) {
            responseJson.put("error", "Não foi possivel deletar usuario: " + e.getMessage());
            return responseJson.toString();
        }
    }
}
