package com.maosquecuram.crud.controllers;

import com.maosquecuram.crud.entities.User;
import com.maosquecuram.crud.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/usuarios")
@CrossOrigin(origins = "http://localhost:4200") // Libera o front Angular
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    // 🔹 LOGIN — autentica o usuário e retorna dados (sem token)
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> credenciais) {
        String email = credenciais.get("email");
        String senha = credenciais.get("senha");

        Optional<User> usuarioOpt = userRepository.findByEmail(email);

        if (usuarioOpt.isEmpty()) {
            return ResponseEntity.status(401).body("Usuário não encontrado");
        }

        User usuario = usuarioOpt.get();

        // Validação simples — use BCrypt no futuro
        if (!usuario.getSenha().equals(senha)) {
            return ResponseEntity.status(401).body("Senha incorreta");
        }

        // Retorna os dados do usuário (sem token)
        Map<String, Object> response = new HashMap<>();
        response.put("id", usuario.getId());
        response.put("nome", usuario.getNome());
        response.put("email", usuario.getEmail());

        return ResponseEntity.ok(response);
    }

    // 🔹 REGISTRO — cria novo usuário
    @PostMapping("/registrar")
    public ResponseEntity<?> registrar(@RequestBody User novoUsuario) {
        Optional<User> existente = userRepository.findByEmail(novoUsuario.getEmail());
        if (existente.isPresent()) {
            return ResponseEntity.badRequest().body("Email já cadastrado");
        }

        // Salva novo usuário
        User salvo = userRepository.save(novoUsuario);
        return ResponseEntity.ok(salvo);
    }
}
