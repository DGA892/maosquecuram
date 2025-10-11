package com.maosquecuram.crud.controllers;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.maosquecuram.crud.dto.UserDTO;
import com.maosquecuram.crud.entities.User;
import com.maosquecuram.crud.repositories.UserRepository;

@RestController
@RequestMapping("/users")
public class UserController {
   @Autowired
   private UserRepository repository;
   // LISTAR
   @GetMapping("/buscar")
   public List<UserDTO> listUsers(UserDTO user) {
 
       return repository.findAll().stream().map(u -> new UserDTO(u.getNome(), u.getEmail(), u.getNumtel(), null)).toList();
   }
   // FORMULÁRIO DE CRIAÇÃO
   @PostMapping("/cadastrar")
   public ResponseEntity<?> cadastrarUser(@RequestBody UserDTO user){
	   if(repository.findByEmail(user.email()).isEmpty() || repository.findByNumtel(user.numtel()).isEmpty()) {
		   return ResponseEntity.badRequest().body(Map.of("error", "Email ou número de telefone em uso"));
	   }
	   User userSave = new User(user.nome(), user.email(), user.numtel(), user.senha());
	   repository.save(userSave);
       return ResponseEntity.ok().body(Map.of("sucesso", "Usuário cadastrado"));
   }
   
   // Atualiza o usuário e faz a validação já vendo se tem algum campo null
   @PutMapping("/update/{id}")
   public ResponseEntity<?> updateUser(@PathVariable Long id, @RequestBody UserDTO user) {
		Optional<User> optionalUser = repository.findById(id);
		if(optionalUser.isEmpty()) {return ResponseEntity.badRequest().body(Map.of("error", "Usuário não existe"));}
		
	    User userUpdate  = optionalUser.get();
		
		if (user.email() != null && !(user.email().isBlank())) {
			userUpdate.setEmail((user.email()));
		}
		
		if (user.nome() != null && !(user.nome().isBlank())) {
			userUpdate.setName((user.nome()));
		}
		
		
		if (user.numtel() != null && !(user.numtel().isBlank())) {
			userUpdate.setNumtel((user.numtel()));
		}
		repository.save(userUpdate);
		
	   return ResponseEntity.ok().body(Map.of("sucesso", "Usuário atualizado"));
   }

   // EXCLUIR
   @GetMapping("/delete/{id}")
   public ResponseEntity<?> deleteUser(@PathVariable Long id) {
	   Optional<User> optionalUser = repository.findById(id);
		if(optionalUser.isEmpty()) {return ResponseEntity.badRequest().body(Map.of("error", "Usuário não existe"));}
		
       repository.deleteById(id);
        return ResponseEntity.ok().body(Map.of("sucesso", "Usuário deletado"));
   }  
   
   @GetMapping("/{id}")
public ResponseEntity<?> getById(@PathVariable Long id) {
    Optional<User> opt = repository.findById(id);
    if (opt.isEmpty()) {
        return ResponseEntity.badRequest().body(Map.of("error", "Usuário não encontrado"));
    }
    return ResponseEntity.ok(opt.get());
}

}
