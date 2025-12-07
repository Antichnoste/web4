package org.example.web4.service;

import lombok.RequiredArgsConstructor;
import org.example.web4.dto.AuthRequest;
import org.example.web4.dto.AuthResponse;
import org.example.web4.entity.UserEntity;
import org.example.web4.exception.UserAlreadyExistsException;
import org.example.web4.exception.UserNotFoundException;
import org.example.web4.repository.UserRepository;
import org.example.web4.security.JwtUtil;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class UserService{

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AuthResponse register(AuthRequest request) {
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new UserAlreadyExistsException("Пользователь с такими данными уже существует");
        }

        UserEntity u = UserEntity.builder()
                .username(request.getUsername())
                .passwordHash(passwordEncoder.encode(request.getPassword()))
                .createdAt(LocalDateTime.now())
                .build();

        userRepository.save(u);
        String token = jwtUtil.generateToken(u.getUsername());
        return new AuthResponse(token);
    }

    public AuthResponse login(AuthRequest request) {
        UserEntity u = userRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new IllegalArgumentException("Invalid credentials"));
        if (!passwordEncoder.matches(request.getPassword(), u.getPasswordHash())) {
            throw new IllegalArgumentException("Invalid credentials");
        }
        return new AuthResponse(jwtUtil.generateToken(u.getUsername()));
    }

    public UserEntity findByUsername(String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new UserNotFoundException("Пользователь по такому имени не найден"));
    }
}
