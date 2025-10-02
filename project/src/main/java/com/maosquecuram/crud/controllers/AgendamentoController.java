package com.maosquecuram.crud.controllers;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.maosquecuram.crud.dto.AgendamentoDTO;
import com.maosquecuram.crud.entities.Agendamento;
import com.maosquecuram.crud.repositories.AgendamentoRepository;

@RestController
@RequestMapping("/agendamentos")
public class AgendamentoController {

    @Autowired
    private AgendamentoRepository repository;

    // LISTAR TODOS OS AGENDAMENTOS
    @GetMapping
    public List<AgendamentoDTO> listAll() {
        return repository.findAll()
                .stream()
                .map(a -> new AgendamentoDTO(
                        a.getId(),
                        a.getServico(),
                        a.getProfissional(),
                        a.getUser(),
                        a.getData(),
                        a.getHora()
                ))
                .toList();
    }

    // BUSCAR AGENDAMENTO POR ID
    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable Long id) {
        Optional<Agendamento> opt = repository.findById(id);
        if (opt.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Agendamento não encontrado"));
        }
        return ResponseEntity.ok(opt.get());
    }

    // CRIAR NOVO AGENDAMENTO
    @PostMapping("/cadastrar")
    public ResponseEntity<?> create(@RequestBody AgendamentoDTO dto) {
        // Aqui você pode validar se o horário já está ocupado
        boolean exists = repository.existsByProfissionalAndDataAndHora(dto.profissional(), dto.data(), dto.hora());
        if (exists) {
            return ResponseEntity.badRequest().body(Map.of("error", "Horário já ocupado para esse profissional"));
        }

        Agendamento agendamento = new Agendamento(
                dto.servico(),
                dto.profissional(),
                dto.user(),
                dto.data(),
                dto.hora()
        );
        repository.save(agendamento);
        return ResponseEntity.ok(Map.of("sucesso", "Agendamento criado com sucesso"));
    }

    // ATUALIZAR AGENDAMENTO
    @PutMapping("/update/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody AgendamentoDTO dto) {
        Optional<Agendamento> optional = repository.findById(id);
        if (optional.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Agendamento não existe"));
        }

        Agendamento agendamento = optional.get();

        if (dto.servico() != null && !dto.servico().isBlank()) {
            agendamento.setServico(dto.servico());
        }
        if (dto.data() != null) {
            agendamento.setData(dto.data());
        }
        if (dto.hora() != null) {
            agendamento.setHora(dto.hora());
        }
        if (dto.profissional() != null) {
            agendamento.setProfissional(dto.profissional());
        }
        if (dto.user() != null) {
            agendamento.setUser(dto.user());
        }

        repository.save(agendamento);
        return ResponseEntity.ok(Map.of("sucesso", "Agendamento atualizado"));
    }

    // EXCLUIR AGENDAMENTO
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        Optional<Agendamento> optional = repository.findById(id);
        if (optional.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Agendamento não existe"));
        }

        repository.deleteById(id);
        return ResponseEntity.ok(Map.of("sucesso", "Agendamento deletado"));
    }
}
