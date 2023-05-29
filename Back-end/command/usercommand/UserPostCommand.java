package command.usercommand;

import com.sun.net.httpserver.HttpExchange;
import web.rest.UserResource;

public class UserPostCommand implements UserCommand {
    UserResource userResource = new UserResource();

    @Override
    public String execute(HttpExchange exchange) {
        return userResource.createUser(exchange);
    }
}
