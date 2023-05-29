package command.usercommand;

import com.sun.net.httpserver.HttpExchange;

import java.util.ArrayList;
import java.util.List;

public class UserExecutor {
    private final List<UserCommand> userCommands = new ArrayList<>();

    public String executeOperation(UserCommand userCommand, HttpExchange exchange) {
        userCommands.add(userCommand);
        return userCommand.execute(exchange);
    }
}
