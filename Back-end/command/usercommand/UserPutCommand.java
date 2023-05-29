package command.usercommand;

import com.sun.net.httpserver.HttpExchange;
import web.rest.UserResource;

public class UserPutCommand implements UserCommand {
    UserResource userResource = new UserResource();

    @Override
    public String execute(HttpExchange exchange) {
        return userResource.updateUser(exchange);
    }
}
