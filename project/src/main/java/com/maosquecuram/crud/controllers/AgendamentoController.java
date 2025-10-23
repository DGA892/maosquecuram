package com.maosquecuram.crud.controllers;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
     * 🗓️ Retorna os dias do mês que possuem agendamentos
     */
    @GetMapping("/month/{year}/{month}")
    public ResponseEntity<List<Integer>> listarDiasComAgendamentos(
            @PathVariable int year,
            @PathVariable int month) {

        List<Agendamento> agendamentos = agendamentoService.listarTodos();
        List<Integer> dias = agendamentos.stream()
                .filter(a -> a.getData().getYear() == year && a.getData().getMonthValue() == month)
                .map(a -> a.getData().getDayOfMonth())
                .distinct()
                .toList();

        return ResponseEntity.ok(dias);
    }

    @GetMapping("/day/{date}")
    public ResponseEntity<Map<String, Agendamento>> listarAgendamentosDoDia(@PathVariable String date) {
        LocalDate dia = LocalDate.parse(date); // "YYYY-MM-DD"
        List<Agendamento> agendamentos = agendamentoService.listarTodos().stream()
                .filter(a -> a.getData().equals(dia))
                .toList();

        // Mapeia cada horário para o agendamento
        Map<String, Agendamento> map = agendamentos.stream()
                .collect(Collectors.toMap(a -> a.getHora().toString(), a -> a));

        return ResponseEntity.ok(map);
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
