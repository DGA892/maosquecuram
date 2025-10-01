package com.maosquecuram.crud.controllers;

import com.maosquecuram.crud.entities.Agendamento;
import com.maosquecuram.crud.repositories.AgendamentoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/agendamentos")
public class AgendamentoController {

    @Autowired
    private AgendamentoRepository agendamentoRepository;

    // Exibir lista de agendamentos (retorna todos os agendamentos em formato JSON)
    @GetMapping
    public List<Agendamento> listarAgendamentos() {
        return agendamentoRepository.findAll(); // Retorna todos os agendamentos como JSON
    }

    // Salvar agendamento (recebe dados no corpo da requisição e retorna o agendamento salvo)
    @PostMapping("/save")
    public Agendamento salvarAgendamento(@RequestBody Agendamento agendamento) {
        // Aqui você pode adicionar validações ou verificações de disponibilidade antes de salvar
        return agendamentoRepository.save(agendamento); // Retorna o agendamento salvo
    }

    // Excluir um agendamento pelo ID
    @DeleteMapping("/delete/{id}")
    public void deletarAgendamento(@PathVariable Long id) {
        agendamentoRepository.deleteById(id);
    }

    // Exibir um agendamento específico pelo ID
    @GetMapping("/{id}")
    public Agendamento mostrarAgendamento(@PathVariable Long id) {
        return agendamentoRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Agendamento não encontrado com ID: " + id));
    }
}
