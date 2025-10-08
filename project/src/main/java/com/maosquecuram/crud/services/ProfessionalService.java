package com.maosquecuram.crud.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.maosquecuram.crud.entities.Professional;
import com.maosquecuram.crud.repositories.ProfessionalRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class ProfessionalService {

    @Autowired
    private ProfessionalRepository repository;

    /**
     * Retorna todos os profissionais cadastrados.
     */
    public List<Professional> findAll() {
        return repository.findAll();
    }

    /**
     * Busca um profissional pelo ID.
     */
    public Professional findById(Long id) {
        Optional<Professional> professional = repository.findById(id);
        return professional.orElseThrow(() ->
                new EntityNotFoundException("Profissional com ID " + id + " não encontrado."));
    }

    /**
     * Cadastra um novo profissional.
     */
    public Professional create(Professional professional) {
        return repository.save(professional);
    }

    /**
     * Atualiza os dados de um profissional existente.
     */
    public Professional update(Long id, Professional newData) {
        Professional existing = findById(id);

        existing.setNome(newData.getNome());
        existing.setEmail(newData.getEmail());
        existing.setCpf(newData.getCpf());
        existing.setNumtel(newData.getNumtel());
        existing.setSenha(newData.getSenha());

        return repository.save(existing);
    }

    /**
     * Exclui um profissional pelo ID.
     */
    public void delete(Long id) {
        if (!repository.existsById(id)) {
            throw new EntityNotFoundException("Profissional com ID " + id + " não encontrado.");
        }
        repository.deleteById(id);
    }
}
