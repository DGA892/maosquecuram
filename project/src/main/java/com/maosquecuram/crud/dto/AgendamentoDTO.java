package com.maosquecuram.crud.dto;

import java.time.LocalDate;
import java.time.LocalTime;


public record AgendamentoDTO(
        Long id,
        String servico,
        String profissional,
        String user,
        LocalDate data,
        LocalTime hora
) {}
