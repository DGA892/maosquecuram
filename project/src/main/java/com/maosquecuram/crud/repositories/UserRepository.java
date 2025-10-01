package com.maosquecuram.crud.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.maosquecuram.crud.entities.User;
public interface UserRepository extends JpaRepository<User, Long> {
  
   // Busca personalizada por email
   Optional<User> findByNumtel(String numtel);
   Optional<User> findByEmail(String email);
  
   // Busca personalizada por nome contendo texto
   List<User> findByNomeContaining(String nome);
// Busca personalizada por email contendo texto
   List<User> findByEmailContaining(String email);
}

