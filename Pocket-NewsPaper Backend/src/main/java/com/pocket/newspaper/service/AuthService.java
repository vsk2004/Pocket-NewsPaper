package com.pocket.newspaper.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.pocket.newspaper.dto.AuthResponse;
import com.pocket.newspaper.dto.LoginRequest;
import com.pocket.newspaper.dto.SignupRequest;
import com.pocket.newspaper.model.User;
import com.pocket.newspaper.repo.UserRepo;
import com.pocket.newspaper.security.JwtService;

@Service
public class AuthService {

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private AuthenticationManager authenticationManager;


    public AuthResponse signup(SignupRequest request) {

        if (userRepo.existsByEmail(request.getEmail())) {

            return new AuthResponse(
                    null,
                    "Email already registered!"
            );

        }

        User user = new User();

        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(
                passwordEncoder.encode(request.getPassword())
        );

        userRepo.save(user);

        return new AuthResponse(
                null,
                "Account created successfully!"
        );
    }



public AuthResponse login(LoginRequest request) {

    try {

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

    } catch (BadCredentialsException e) {

        throw new RuntimeException("Invalid email or password");

    }

    User user = userRepo.findByEmail(request.getEmail())
            .orElseThrow(() -> new RuntimeException("Invalid email or password"));

    String token = jwtService.generateToken(user.getEmail());

    return new AuthResponse(
            token,
            "Login Successful!"
    );
}

}