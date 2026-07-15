package com.pocket.newspaper.repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pocket.newspaper.model.User;

public interface UserRepo extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);

    boolean existsByEmail(String email);

}
