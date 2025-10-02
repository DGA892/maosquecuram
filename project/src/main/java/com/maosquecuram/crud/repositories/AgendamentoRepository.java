package com.maosquecuram.crud.repositories;

import com.maosquecuram.crud.entities.Agendamento;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.time.LocalTime;

public interface AgendamentoRepository extends JpaRepository<Agendamento, Long> {
    boolean existsByProfissionalAndDataAndHora(String profissional, LocalDate data, LocalTime hora);
}
