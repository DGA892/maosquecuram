package com.maosquecuram.crud.entities;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;
import jakarta.validation.constraints.NotBlank;


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
	@NotBlank(message = "Selecione uma Data")
    private LocalDate data;
	@NotBlank(message = "Selecione um Horário")
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
                        