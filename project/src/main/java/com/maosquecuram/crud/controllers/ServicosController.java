package com.maosquecuram.crud.controllers;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.maosquecuram.crud.dto.ServicoDTO;
import com.maosquecuram.crud.entities.Servicos;
import com.maosquecuram.crud.repositories.ServicosRepository;

@RestController
@RequestMapping("/servicos")
public class ServicosController {

    @Autowired
    private ServicosRepository repository;

    // LISTAR
    @GetMapping("/buscar")
    public List<ServicoDTO> listarServicos() {
        return repository.findAll()
                .stream()
                .map(s -> new ServicoDTO(s.getNome(), s.getDescricao()))
                .toList();
    }

    // CADASTRAR
    @PostMapping("/cadastrar")
    public ResponseEntity<?> cadastrarServico(@RequestBody ServicoDTO servico) {
        try {
            if (servico.nome() == null || servico.nome().isBlank()) {
                return ResponseEntity.badRequest().body(Map.of("error", "O nome do serviço é obrigatório"));
            }

            boolean existe = repository.findByNomeIgnoreCase(servico.nome()).isPresent();
            if (existe) {
                return ResponseEntity.badRequest().body(Map.of("error", "Já existe um serviço com este nome"));
            }

            Servicos novo = new Servicos(null, servico.nome(), servico.descricao());
            repository.save(novo);
            return ResponseEntity.ok().body(Map.of("sucesso", "Serviço cadastrado com sucesso"));

        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(Map.of("error", "Erro ao cadastrar serviço"));
        }
    }
    
}

    // ATUAL
