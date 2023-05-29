package state.userstate;

import model.User;

public class NotLoggedState implements UserState{
    @Override
    public void next(User user) {
        user.setStateLogin(new LoggedState());
    }

    @Override
    public void prev(User user) {
        System.out.println("Usuario já esta no estado incial");
    }

    @Override
    public void printStatus() {
        System.out.println("Usuario não esta logado");
    }
}
