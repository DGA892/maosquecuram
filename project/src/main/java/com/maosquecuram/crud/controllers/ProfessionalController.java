package com.maosquecuram.crud.controllers;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.maosquecuram.crud.entities.Professional;
import com.maosquecuram.crud.services.ProfessionalService;

@RestController
@RequestMapping("/api/professionals")
@CrossOrigin(origins = "http://localhost:4200") // permite requisições do Angular
public class ProfessionalController {

    @Autowired
    private ProfessionalService service;

    /** 🔹 Buscar todos os profissionais */
    @GetMapping
    public List<Professional> listarTodos() {
        return service.findAll();
    }

    /** 🔹 Buscar profissional por ID */
    @GetMapping("/{id}")
    public ResponseEntity<?> buscarPorId(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(service.findById(id));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    /** 🔹 Cadastrar novo profissional */
    @PostMapping
    public ResponseEntity<?> cadastrar(@RequestBody Professional profissional) {
        try {
            Professional novo = service.create(profissional);
            return ResponseEntity.ok(novo);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", "Erro ao cadastrar profissional."));
        }
    }

    /** 🔹 Atualizar profissional */
    @PutMapping("/{id}")
    public ResponseEntity<?> atualizar(@PathVariable Long id, @RequestBody Professional profissional) {
        try {
            Professional atualizado = service.update(id, profissional);
            return ResponseEntity.ok(atualizado);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", "Erro ao atualizar profissional."));
        }
    }

    /** 🔹 Deletar profissional */
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletar(@PathVariable Long id) {
        try {
            service.delete(id);
            return ResponseEntity.ok(Map.of("message", "Profissional removido com sucesso."));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
}
