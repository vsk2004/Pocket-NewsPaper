package com.pocket.newspaper.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pocket.newspaper.dto.AuthResponse;
import com.pocket.newspaper.dto.LoginRequest;
import com.pocket.newspaper.dto.SignupRequest;
import com.pocket.newspaper.service.AuthService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/signup")
    public ResponseEntity<AuthResponse> signup(
            @Valid@RequestBody SignupRequest request) {

        return ResponseEntity.ok(
                authService.signup(request)
        );

    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(  @Valid@RequestBody LoginRequest request) {

    try {

        AuthResponse response = authService.login(request);

        return ResponseEntity.ok(response);

    } catch (RuntimeException e) {

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(new AuthResponse(null, e.getMessage()));

    }

}

}