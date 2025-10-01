package com.maosquecuram.crud.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
@Entity
public class User {
    
	   @Id
	   @GeneratedValue(strategy = GenerationType.IDENTITY)
	   private Long id;
	  
	   @NotBlank(message = "Nome é obrigatório")
	   private String nome;
	  
	   @NotBlank(message = "Email é obrigatório")
	   @Column(unique = true)
	   private String email;
	  
	   @NotBlank(message = "Número de telefone é obrigatório")
	   @Column(unique = true)
	   private String numtel;
	   
	   @NotBlank(message = "Senha é obrigatória")
	   private String senha;

	// Construtores
	   public User() {}

	public User(String nome,String email, String numtel, String senha) {
		this.nome = nome;
		this.email = email;
		this.numtel = numtel;
		this.senha = senha;
	}

	//getters and Setters
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getNumtel() {
		return numtel;
	}

	public void setNumtel(String numtel) {
		this.numtel = numtel;
	}

	public String getSenha() {
		return senha;
	}

	public void setSenha(String senha) {
		this.senha = senha;
	}

	public String getName() {
		// TODO Auto-generated method stub
		return nome;
	}

	public void setName(String nome) {
		this.nome = nome;
	}
	
}
	   
	   