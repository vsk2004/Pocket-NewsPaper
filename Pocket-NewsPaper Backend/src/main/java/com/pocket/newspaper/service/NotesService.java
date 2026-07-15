package com.pocket.newspaper.service;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.pocket.newspaper.model.Note;
import com.pocket.newspaper.model.User;
import com.pocket.newspaper.repo.NotesRepo;
import com.pocket.newspaper.repo.UserRepo;
@Service
public class NotesService {
    @Autowired
    private NotesRepo notesRepo;

    @Autowired
    private UserRepo userRepo;

    public Note saveNote(Note note) {

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        String email = authentication.getName();

        User user = userRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        String[] points = note.getContent().split("\\n");

        Note firstSavedNote = null;

        for (String point : points) {

            if (point.trim().isEmpty()) {
                continue;
            }

            Note newNote = new Note();

            newNote.setContent(point.trim());

            newNote.setUser(user);

            Note saved = notesRepo.save(newNote);

            if (firstSavedNote == null) {
                firstSavedNote = saved;
            }
        }

        return firstSavedNote;
    }
   public List<Note> getAllNotes() {

        Authentication authentication =
                 SecurityContextHolder.getContext().getAuthentication();

        String email = authentication.getName();

        User user = userRepo.findByEmail(email).orElseThrow();

        return notesRepo.findByUser(user);
    }

    @Transactional
    public void deleteNote(Long id) {

        Authentication authentication =
                 SecurityContextHolder.getContext().getAuthentication();

        String email = authentication.getName();

         User user = userRepo.findByEmail(email).orElseThrow();

        notesRepo.deleteByIdAndUser(id, user);
    }
}
