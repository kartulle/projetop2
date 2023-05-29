package state.userstate;

import model.User;

public interface UserState {
    void next(User user);
    void prev(User user);
    void printStatus();
}
