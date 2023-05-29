package web.rest;

import com.sun.net.httpserver.HttpExchange;
import dao.UserDao;
import dao.impl.UserDaoImpl;
import model.User;
import org.json.JSONException;
import org.json.JSONObject;
import org.json.JSONTokener;
import service.AuthService;
import service.UserService;
import service.impl.AuthServiceImpl;
import service.impl.UserServiceImpl;

import java.io.IOException;
import java.io.InputStreamReader;

public class AuthResource {

    UserDao userDao = new UserDaoImpl();

    AuthService authService = new AuthServiceImpl(userDao);

    public String authenticateUser(HttpExchange exchange) {
        try {
            InputStreamReader reader = new InputStreamReader(exchange.getRequestBody(), "utf-8");
            JSONObject json = new JSONObject(new JSONTokener(reader));
            String username = json.getString("username");
            String password = json.getString("password");

            // --- SE INFORMAÇÕES CONFERE, return TRUE ---
            JSONObject responseJson = new JSONObject();

            User user = authService.authenticateUser(username, password);

            if (user != null) {
                responseJson.put("status", "success");
                responseJson.put("name", user.getName());
                responseJson.put("role", user.getRole());
                return responseJson.toString();

            }
            responseJson.put("status", "error: credenciais inválidas.");
            return responseJson.toString();
        } catch (JSONException e) {
            return e.getMessage();
        } catch (IOException e) {
            return e.getMessage();
        }
    }
}
