package state.userstate;

import model.User;

public class LoggedState implements UserState{
    @Override
    public void next(User user) {
        System.out.println("Usuario já esta no estado final");
    }

    @Override
    public void prev(User user) {
        user.setStateLogin(new NotLoggedState());
    }

    @Override
    public void printStatus() {
        System.out.println("Usuario está logado");
    }
}
