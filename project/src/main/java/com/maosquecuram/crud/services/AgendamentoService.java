package com.maosquecuram.crud.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.maosquecuram.crud.entities.Agendamento;
import com.maosquecuram.crud.repositories.AgendamentoRepository;

@Service
public class AgendamentoService {

    @Autowired
    private AgendamentoRepository agendamentoRepository;

    public List<Agendamento> listarTodos() {
        return agendamentoRepository.findAll();
    }

    public List<Agendamento> listarPorUsuario(String user) {
        return agendamentoRepository.findByUser(user);
    }

    public Optional<Agendamento> buscarPorId(Long id) {
        return agendamentoRepository.findById(id);
    }

    public Agendamento cadastrar(Agendamento agendamento) {
        if (agendamento.getData() == null || agendamento.getHora() == null) {
            throw new IllegalArgumentException("Data e hora do agendamento são obrigatórias.");
        }
        if (agendamento.getUser() == null || agendamento.getUser().isEmpty()) {
            throw new IllegalArgumentException("Usuário do agendamento é obrigatório.");
        }

        // ✅ Verifica direto no banco se o horário está ocupado
        Optional<Agendamento> existente = agendamentoRepository.findByProfissionalAndDataAndHora(
            agendamento.getProfissional(),
            agendamento.getData(),
            agendamento.getHora()
        );

        if (existente.isPresent()) {
            throw new IllegalArgumentException("Horário já ocupado para esse profissional.");
        }

        return agendamentoRepository.save(agendamento);
    }

    public Agendamento atualizar(Long id, Agendamento novoAgendamento) {
        Agendamento agendamento = agendamentoRepository.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("Agendamento com ID " + id + " não encontrado."));

        agendamento.setServico(novoAgendamento.getServico());
        agendamento.setProfissional(novoAgendamento.getProfissional());
        agendamento.setData(novoAgendamento.getData());
        agendamento.setHora(novoAgendamento.getHora());
        agendamento.setUser(novoAgendamento.getUser());

        return agendamentoRepository.save(agendamento);
    }

    public void deletar(Long id) {
        if (!agendamentoRepository.existsById(id)) {
            throw new IllegalArgumentException("Agendamento com ID " + id + " não encontrado.");
        }
        agendamentoRepository.deleteById(id);
    }
}
