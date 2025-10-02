package com.maosquecuram.crud.dto;

import java.time.LocalDate;
import java.time.LocalTime;

public record AppointmentDTO(
        Long id,
        String servico,
        String profissional,
        String user,
        LocalDate data,
        LocalTime hora
) {}
