package mk.ukim.finki.emtlab.service;

import mk.ukim.finki.emtlab.model.User;

public interface AuthService {
    User login(String username, String password);
}

