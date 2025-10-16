package com.maosquecuram.crud.controllers;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.maosquecuram.crud.dto.CadastrarDTO;
import com.maosquecuram.crud.dto.UserDTO;
import com.maosquecuram.crud.entities.User;
import com.maosquecuram.crud.repositories.UserRepository;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {

    @Autowired
    private UserRepository repository;

    // 🔹 LISTAR TODOS OS USUÁRIOS
    @GetMapping("/buscarTodos")
    public List<UserDTO> listarUsuarios() {
        return repository.findAll().stream()
                .map(u -> new UserDTO(u.getNome(), u.getEmail(), u.getNumtel(), null))
                .toList();
    }

    // 🔹 CADASTRAR USUÁRIO
    @PostMapping("/cadastrar")
    public ResponseEntity<Map<String, String>> cadastrar(@RequestBody @Valid CadastrarDTO user) {
        try {
            boolean emailExistente = repository.findByEmail(user.email()).isPresent();
            boolean telExistente = repository.findByNumtel(user.numtel()).isPresent();

            if (emailExistente || telExistente) {
                return ResponseEntity.badRequest().body(Map.of("error", "Email ou número de telefone em uso"));
            }

            // Criação simples do usuário (sem criptografia)
            User novoUser = new User(
                    user.nome(),
                    user.email(),
                    user.numtel(),
                    user.senha()
            );

            repository.save(novoUser);
            return ResponseEntity.ok(Map.of("sucesso", "Usuário cadastrado com sucesso!"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Erro ao cadastrar usuário: " + e.getMessage()));
        }
    }

    // 🔹 ATUALIZAR USUÁRIO
    @PutMapping("/atualizar/{id}")
    public ResponseEntity<?> atualizar(@PathVariable Long id, @RequestBody CadastrarDTO usuario) {
        try {
            Optional<User> optionalUser = repository.findById(id);
            if (optionalUser.isEmpty()) {
                return ResponseEntity.badRequest().body(Map.of("error", "Usuário não encontrado"));
            }

            User user = optionalUser.get();

            if (usuario.email() != null && !usuario.email().isBlank()) {
                user.setEmail(usuario.email());
            }
            if (usuario.nome() != null && !usuario.nome().isBlank()) {
                user.setNome(usuario.nome());
            }
            if (usuario.numtel() != null && !usuario.numtel().isBlank()) {
                user.setNumtel(usuario.numtel());
            }

            repository.save(user);
            return ResponseEntity.ok(Map.of("sucesso", "Dados do usuário atualizados com sucesso!"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Erro ao atualizar usuário: " + e.getMessage()));
        }
    }

    // 🔹 DELETAR USUÁRIO
    @DeleteMapping("/deletar/{id}")
    public ResponseEntity<?> deletar(@PathVariable Long id) {
        try {
            Optional<User> optionalUser = repository.findById(id);
            if (optionalUser.isEmpty()) {
                return ResponseEntity.badRequest().body(Map.of("error", "Usuário não encontrado"));
            }

            repository.deleteById(id);
            return ResponseEntity.ok(Map.of("sucesso", "Usuário deletado com sucesso!"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Erro ao deletar usuário: " + e.getMessage()));
        }
    }

    // 🔹 BUSCAR USUÁRIO POR ID
    @GetMapping("/{id}")
    public ResponseEntity<?> buscarPorId(@PathVariable Long id) {
        Optional<User> opt = repository.findById(id);
        if (opt.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Usuário não encontrado"));
        }
        return ResponseEntity.ok(opt.get());
    }
    
    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody Map<String, String> loginData) {
        String email = loginData.get("email");
        String senha = loginData.get("senha");

        Optional<User> optionalUser = repository.findByEmail(email);

        if (optionalUser.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "Usuário não encontrado"));
        }

        User user = optionalUser.get();

        // Comparação direta, já que não usa bcrypt
        if (!user.getSenha().equals(senha)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "Senha incorreta"));
        }

        // Monta resposta com dados do usuário (sem senha)
        Map<String, Object> usuario = Map.of(
            "id", user.getId(),
            "nome", user.getNome(),
            "email", user.getEmail(),
            "numtel", user.getNumtel()
        );

        return ResponseEntity.ok(Map.of(
            "sucesso", "Login realizado com sucesso!",
            "usuario", usuario
        ));
    }

}
