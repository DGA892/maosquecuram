package com.maosquecuram.crud.entities;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name = "agendamentos")
public class Agendamento {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String servico;
    private String profissional;
    private String user;
    private LocalDate data;
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
		user = user;
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
                        