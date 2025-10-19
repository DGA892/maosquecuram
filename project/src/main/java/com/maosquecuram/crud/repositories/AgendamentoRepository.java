package com.maosquecuram.crud.repositories;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.maosquecuram.crud.entities.Agendamento;

@Repository
public interface AgendamentoRepository extends JpaRepository<Agendamento, Long> {

    // Lista todos os agendamentos de um usuário específico
    List<Agendamento> findByUser(String user);

    // Verifica se existe um agendamento no mesmo horário e data para um profissional
    Optional<Agendamento> findByProfissionalAndDataAndHora(String profissional, LocalDate data, LocalTime hora);
}
