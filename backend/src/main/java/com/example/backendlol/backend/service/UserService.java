package com.example.backendlol.backend.service;
import com.example.backendlol.backend.model.User;
import com.example.backendlol.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    public User registerUser(User user) {
        if (userRepository.findByUsername(user.getUsername()).isPresent()) {
            throw new RuntimeException("Username already in use");
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        if (user.getRole() == null || user.getRole().isEmpty()) {
            user.setRole("employee"); // Default role if not specified
        }
        return userRepository.save(user);
    }

    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public boolean checkPassword(User user, String rawPassword) {
        return passwordEncoder.matches(rawPassword, user.getPassword());
    }
    // UserService.java
    // public User updateUser(User user) {
    //     return userRepository.save(user);
    // }
    public Optional<User> findById(Long id) {
        return userRepository.findById(id);
    }
    public User updateUser(User user) {
        Optional<User> existingUserOptional = userRepository.findById(user.getId());
        if (existingUserOptional.isPresent()) {
            User existingUser = existingUserOptional.get();
            // Update fields except password
            existingUser.setUsername(user.getUsername());
            existingUser.setEmail(user.getEmail());
            existingUser.setRole(user.getRole());
            // Hash the new password if it's being updated
            if (user.getPassword() != null && !user.getPassword().isEmpty()) {
                existingUser.setPassword(passwordEncoder.encode(user.getPassword()));
            }
            return userRepository.save(existingUser);
        } else {
            throw new RuntimeException("User not found with id: " + user.getId());
        }
    }

}
