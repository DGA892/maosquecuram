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

import com.maosquecuram.crud.dto.FuncionarioDTO;
import com.maosquecuram.crud.entities.Professional;
import com.maosquecuram.crud.repositories.ProfessionalRepository;

@RestController
@RequestMapping("/professionals")
public class ProfessionalController {

    @Autowired
    private ProfessionalRepository repository;

    // LISTAR
    @GetMapping("/buscar")
    public List<FuncionarioDTO> listProfessionals(FuncionarioDTO funcionario) {
        return repository.findAll().stream().map(u -> new FuncionarioDTO(u.getNome(), u.getEmail(), u.getCpf(), u.getNumtel(), null)).toList();

    }

    // FORMULÁRIO DE CRIAÇÃO
    @PostMapping("/cadastrar")
    public ResponseEntity<?> showAddForm(@RequestBody FuncionarioDTO funcionario) {
    	
    	if(repository.findByEmail(funcionario.email()).isEmpty() || repository.findByCpf(funcionario.cpf()).isEmpty() || repository.findByNumtel(funcionario.numtel()).isEmpty()) {
    		
 		   return ResponseEntity.badRequest().body(Map.of("error", "Campos em uso"));
 	   }
 	   Professional professionalSave = new Professional (funcionario.nome(), funcionario.email(), funcionario.cpf(), funcionario.numtel(), funcionario.senha());
 	   repository.save(professionalSave);
        return ResponseEntity.ok().body(Map.of("sucesso", "Professional cadastrado"));
    }


    // EDITAR
    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateProfessional(@PathVariable Long id, @RequestBody FuncionarioDTO funcionario) {
    	try {
			
    	Optional<Professional> professionalIdo = repository.findById(id);
    	
    	if(professionalIdo.isEmpty()) {
    		 return ResponseEntity.badRequest().body(Map.of("error", "Professional não existe no banco de dados"));
    	}
    	Professional professional  = professionalIdo.get();
   		
   		if (funcionario.email() != null && !(funcionario.email().isBlank())) {
   			professional.setEmail((funcionario.email()));
   		}
   		
   		if (funcionario.nome() != null && !(funcionario.nome().isBlank())) {
   			professional.setNome(funcionario.nome());
   		}
   		
   		
   		if (funcionario.numtel() != null && !(funcionario.numtel().isBlank())) {
   			professional.setNumtel((funcionario.numtel()));
   		}
   		repository.save(professional);
    	 return ResponseEntity.ok().body(Map.of("sucess", "Professional atualizado")); // view: adminpage/profissionais.html
    	} catch (Exception e) {
    		 return ResponseEntity.badRequest().body(Map.of("error", "Erro inesperado"));
		}
    }

 

    // EXCLUIR
    @GetMapping("/delete/{id}")
    public ResponseEntity<?> deleteProfessional(@PathVariable Long id) {
 
    	Optional<Professional> professionalIdo = repository.findById(id);
    	
    	if(professionalIdo.isEmpty()) {
    		 return ResponseEntity.badRequest().body(Map.of("error", "Professional não existe no banco de dados"));
    	}
    	repository.deleteById(id);
    	return ResponseEntity.ok().body(Map.of("sucesso", "Professional deletado"));
    }
}
