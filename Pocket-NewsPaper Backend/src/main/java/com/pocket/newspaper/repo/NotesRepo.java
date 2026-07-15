package com.pocket.newspaper.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.pocket.newspaper.model.Note;
import com.pocket.newspaper.model.User;

@Repository
public interface NotesRepo extends JpaRepository<Note, Long> {

    List<Note> findByUser(User user);
    void deleteByIdAndUser(Long id, User user);

}