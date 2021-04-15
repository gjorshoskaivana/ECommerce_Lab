package mk.ukim.finki.emtlab.service;

import mk.ukim.finki.emtlab.model.User;
import mk.ukim.finki.emtlab.model.enumerations.Role;
import org.springframework.security.core.userdetails.UserDetails;

public interface UserService {
    UserDetails loadUserByUsername(String s);
    User register(String username, String password, String repeatPassword, String name, String surname, Role role);
}
