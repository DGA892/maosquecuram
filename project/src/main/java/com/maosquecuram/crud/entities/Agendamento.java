package com.maosquecuram.crud.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;
import java.time.LocalTime;

@Entity
public class Agendamento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Serviço é obrigatório")
    private String servico;

    @NotBlank(message = "Profissional é obrigatório")
    private String profissional;

    @NotNull(message = "Data é obrigatória")
    private LocalDate data;

    @NotNull(message = "Hora é obrigatória")
    private LocalTime hora;

    // Se quiser vincular ao usuário logado
    // @ManyToOne
    // private User usuario;

    public Agendamento() {}

    public Agendamento(String servico, String profissional, LocalDate data, LocalTime hora) {
        this.servico = servico;
        this.profissional = profissional;
        this.data = data;
        this.hora = hora;
    }

    // Getters e setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getServico() { return servico; }
    public void setServico(String servico) { this.servico = servico; }

    public String getProfissional() { return profissional; }
    public void setProfissional(String profissional) { this.profissional = profissional; }

    public LocalDate getData() { return data; }
    public void setData(LocalDate data) { this.data = data; }

    public LocalTime getHora() { return hora; }
    public void setHora(LocalTime hora) { this.hora = hora; }
}
