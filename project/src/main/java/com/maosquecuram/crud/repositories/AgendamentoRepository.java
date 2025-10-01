package com.maosquecuram.crud.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.maosquecuram.crud.entities.Agendamento;

public interface AgendamentoRepository extends JpaRepository<Agendamento, Long> {
    // aqui você pode criar métodos de busca personalizada, ex:
    // List<Agendamento> findByDataAndProfissional(LocalDate data, String profissional);
}
