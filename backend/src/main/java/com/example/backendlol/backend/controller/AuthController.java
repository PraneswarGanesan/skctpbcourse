    package com.example.backendlol.backend.controller;
    import com.example.backendlol.backend.model.User;
    import com.example.backendlol.backend.service.UserService;
    import org.springframework.beans.factory.annotation.Autowired;
    import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.Authentication;

    import java.util.Optional;

    @RestController
    @RequestMapping("/api/auth")
    public class AuthController {

        @Autowired
        private UserService userService;

        @PostMapping("/register")
        public ResponseEntity<?> registerUser(@RequestBody User user) {
            if (userService.findByUsername(user.getUsername()).isPresent()) {
                return ResponseEntity.badRequest().body("Username already in use");
            }
            User registeredUser = userService.registerUser(user);
            return ResponseEntity.ok(registeredUser);
        }

        @PostMapping("/login")
        public ResponseEntity<?> loginUser(@RequestBody User user) {
            Optional<User> optionalUser = userService.findByUsername(user.getUsername());
            if (optionalUser.isPresent() && userService.checkPassword(optionalUser.get(), user.getPassword())) {
                return ResponseEntity.ok(optionalUser.get());
            }
            return ResponseEntity.badRequest().body("Invalid username or password");
        }

    }