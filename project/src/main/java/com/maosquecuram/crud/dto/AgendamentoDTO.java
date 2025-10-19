package com.maosquecuram.crud.dto;

import java.time.LocalDate;
import java.time.LocalTime;

import com.fasterxml.jackson.annotation.JsonFormat;

public record AgendamentoDTO(
        Long id,
        String servico,
        String profissional,
        String user,
        @JsonFormat(pattern = "yyyy-MM-dd")
        LocalDate data,
        @JsonFormat(pattern = "HH:mm")
        LocalTime hora
) {}
