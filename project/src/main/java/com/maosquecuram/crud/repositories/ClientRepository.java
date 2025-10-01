package com.maosquecuram.crud.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.maosquecuram.crud.entities.User;

import ch.qos.logback.core.net.server.Client;
import jakarta.validation.Valid;
public interface ClientRepository extends JpaRepository<User, Long> {
  
   // Busca personalizada por email
   Optional<User> findByEmail(String email);
   
  
   // Busca personalizada por nome contendo texto
   List<User> findByNomeContaining(String nome);

   void save(@Valid Client client);
}

