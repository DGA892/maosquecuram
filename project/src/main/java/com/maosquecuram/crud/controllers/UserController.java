package com.maosquecuram.crud.controllers;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.maosquecuram.crud.dto.CadastrarDTO;
import com.maosquecuram.crud.dto.PerfilDTO;
import com.maosquecuram.crud.dto.UserDTO;
import com.maosquecuram.crud.entities.User;
import com.maosquecuram.crud.repositories.UserRepository;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "http://localhost:4200", allowCredentials = "true")
public class UserController {

    @Autowired
    private UserRepository repository;

    // 🔹 LISTAR TODOS OS USUÁRIOS
    @GetMapping("/buscarTodos")
    public List<UserDTO> listarUsuarios() {
        return repository.findAll().stream()
                .map(u -> new UserDTO(
                        u.getNome(),
                        u.getEmail(),
                        u.getNumtel(),
                        null,
                        u.getDataNascimento() != null ? u.getDataNascimento().toString() : null
                ))
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

            LocalDate dataNasc = user.dataNascimento() != null && !user.dataNascimento().isEmpty()
                    ? LocalDate.parse(user.dataNascimento())
                    : null;

            User novoUser = new User(
                    user.nome(),
                    user.email(),
                    user.numtel(),
                    user.senha(),
                    dataNasc
            );
            repository.save(novoUser);

            return ResponseEntity.ok(Map.of("sucesso", "Usuário cadastrado com sucesso!"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Erro ao cadastrar usuário: " + e.getMessage()));
        }
    }

    // 🔹 LOGIN
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
        if (!user.getSenha().equals(senha)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "Senha incorreta"));
        }

        Map<String, Object> usuario = Map.of(
                "id", user.getId(),
                "nome", user.getNome(),
                "email", user.getEmail(),
                "numtel", user.getNumtel(),
                "role", user.getRole(),
                "dataNascimento", user.getDataNascimento() != null ? user.getDataNascimento().toString() : null
        );

        return ResponseEntity.ok(Map.of("usuario", usuario));
    }

    // 🔹 RETORNAR USUÁRIO LOGADO POR ID
    @GetMapping("/usuario-logado")
    public ResponseEntity<Map<String, Object>> usuarioLogado(@RequestParam Long id) {
        Optional<User> optUser = repository.findById(id);
        if (optUser.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "Usuário não encontrado"));
        }

        User user = optUser.get();
        Map<String, Object> usuario = Map.of(
                "id", user.getId(),
                "nome", user.getNome(),
                "email", user.getEmail(),
                "numtel", user.getNumtel(),
                "role", user.getRole(),
                "dataNascimento", user.getDataNascimento() != null ? user.getDataNascimento().toString() : null
        );

        return ResponseEntity.ok(Map.of("usuario", usuario));
    }

    // 🔹 BUSCAR PERFIL
    @GetMapping("/perfil/{id}")
    public ResponseEntity<PerfilDTO> buscarPerfil(@PathVariable Long id) {
        Optional<User> userOpt = repository.findById(id);
        if (userOpt.isEmpty()) {
            return ResponseEntity.badRequest().build();
        }

        User user = userOpt.get();
        return ResponseEntity.ok(new PerfilDTO(
                user.getId(),
                user.getNome(),
                user.getEmail(),
                user.getNumtel(),
                user.getDataNascimento() != null ? user.getDataNascimento().toString() : null
        ));
    }
}
