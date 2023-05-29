package command.usercommand;

import com.sun.net.httpserver.HttpExchange;

public interface UserCommand {
    public String execute(HttpExchange exchange);
}
