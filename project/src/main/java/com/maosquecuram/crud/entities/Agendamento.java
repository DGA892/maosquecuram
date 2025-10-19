package com.maosquecuram.crud.entities;

import java.time.LocalDate;
import java.time.LocalTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;


@Entity
@Table(name = "agendamentos")
public class Agendamento {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

	@NotBlank(message = "Serviço é obrigatório")
    private String servico;
	@NotBlank(message = "Profissional é obrigatório")
    private String profissional;
	@NotBlank(message = "Usuário é obrigatório")
    private String user;
	@NotNull(message = "Selecione uma Data")
	private LocalDate data;

	@NotNull(message = "Selecione um Horário")
	private LocalTime hora;


    public Agendamento() {}

    public Agendamento(String servico, String profissional, String user, LocalDate data, LocalTime hora) {
        this.servico = servico;
        this.profissional = profissional;
        this.user = user;
        this.data = data;
        this.hora = hora;
    }

     // Getters e Setters

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getServico() {
		return servico;
	}

	public void setServico(String servico) {
		this.servico = servico;
	}

	public String getProfissional() {
		return profissional;
	}

	public void setProfissional(String profissional) {
		this.profissional = profissional;
	}

	public String getUser() {
		return user;
	}

	public void setUser(String user) {
		this.user = user;
	}

	public LocalDate getData() {
		return data;
	}

	public void setData(LocalDate data) {
		this.data = data;
	}

	public LocalTime getHora() {
		return hora;
	}

	public void setHora(LocalTime hora) {
		this.hora = hora;
	}

   
    
    
}
                        