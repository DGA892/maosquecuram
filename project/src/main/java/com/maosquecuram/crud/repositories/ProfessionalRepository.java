package com.maosquecuram.crud.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.maosquecuram.crud.dto.FuncionarioDTO;
import com.maosquecuram.crud.entities.Professional;


public interface ProfessionalRepository extends JpaRepository<Professional, Long> {
	Optional<Professional> findByEmail(String email);
	Optional<Professional> findByCpf(String Cpf);
	Optional<Professional> findByNumtel(String numtel);


	


}
