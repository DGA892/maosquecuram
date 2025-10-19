package com.maosquecuram.crud.controllers;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.maosquecuram.crud.dto.AgendamentoDTO;
import com.maosquecuram.crud.entities.Agendamento;
import com.maosquecuram.crud.services.AgendamentoService;

@RestController
@RequestMapping("/agendamentos")
@CrossOrigin(origins = "http://localhost:4200") // permite acesso do Angular
public class AgendamentoController {

    @Autowired
    private AgendamentoService agendamentoService;

    /**
     * 🧾 Listar todos os agendamentos
     */
    @GetMapping
    public ResponseEntity<List<Agendamento>> listarTodos() {
        List<Agendamento> agendamentos = agendamentoService.listarTodos();
        return ResponseEntity.ok(agendamentos);
    }

    /**
     * 👤 Listar agendamentos de um usuário específico
     */
    @GetMapping("/usuario/{user}")
    public ResponseEntity<?> listarPorUsuario(@PathVariable String user) {
        List<Agendamento> agendamentos = agendamentoService.listarPorUsuario(user);

        if (agendamentos.isEmpty()) {
            return ResponseEntity.ok(Map.of("mensagem", "Nenhum agendamento encontrado para o usuário informado."));
        }

        return ResponseEntity.ok(agendamentos);
    }

    /**
     * 🔍 Buscar agendamento por ID
     */
    @GetMapping("/{id}")
    public ResponseEntity<?> buscarPorId(@PathVariable Long id) {
        Optional<Agendamento> opt = agendamentoService.buscarPorId(id);

        if (opt.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Agendamento não encontrado"));
        }

        return ResponseEntity.ok(opt.get());
    }

    /**
     * 🗓️ Criar novo agendamento
     */
    @PostMapping("/cadastrar")
    public ResponseEntity<?> cadastrar(@RequestBody AgendamentoDTO dto) {
        try {
            Agendamento novo = new Agendamento(
                dto.servico(),
                dto.profissional(),
                dto.user(),
                dto.data(),
                dto.hora()
            );

            Agendamento salvo = agendamentoService.cadastrar(novo);
            return ResponseEntity.ok(Map.of(
                "sucesso", "Agendamento criado com sucesso",
                "id", salvo.getId()
            ));

        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(Map.of("error", "Erro interno ao criar agendamento."));
        }
    }

    /**
     * ✏️ Atualizar agendamento existente
     */
    @PutMapping("/update/{id}")
    public ResponseEntity<?> atualizar(@PathVariable Long id, @RequestBody AgendamentoDTO dto) {
        try {
            Agendamento novoAgendamento = new Agendamento(
                dto.servico(),
                dto.profissional(),
                dto.user(),
                dto.data(),
                dto.hora()
            );

            Agendamento atualizado = agendamentoService.atualizar(id, novoAgendamento);
            return ResponseEntity.ok(Map.of(
                "sucesso", "Agendamento atualizado com sucesso",
                "id", atualizado.getId()
            ));

        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(Map.of("error", "Erro interno ao atualizar agendamento."));
        }
    }

    /**
     *  Excluir agendamento
     */
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deletar(@PathVariable Long id) {
        try {
            agendamentoService.deletar(id);
            return ResponseEntity.ok(Map.of("sucesso", "Agendamento deletado com sucesso"));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(Map.of("error", "Erro interno ao deletar agendamento."));
        }
    }
}
