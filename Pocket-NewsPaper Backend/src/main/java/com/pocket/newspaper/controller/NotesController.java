package com.pocket.newspaper.controller;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pocket.newspaper.model.Note;
import com.pocket.newspaper.service.NotesService;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/notes")
public class NotesController {
    
    @Autowired
    private NotesService notesService;

    

    @PostMapping("/add")
    public ResponseEntity<Note> addNote(@RequestBody Note note) {
        return ResponseEntity.ok(notesService.saveNote(note));
    }

    @GetMapping("/all")
    public ResponseEntity<List<Note>> getAllNotes()
    {
        return ResponseEntity.ok(notesService.getAllNotes());
    }
    
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteNote(@PathVariable Long id)
    {
        notesService.deleteNote(id);
        return ResponseEntity.ok("Note deleted successfully");
    }

}
