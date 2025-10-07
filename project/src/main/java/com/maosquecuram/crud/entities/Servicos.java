package com.maosquecuram.crud.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;

@Entity
public class Servicos {

		@Id
		@GeneratedValue(strategy = GenerationType.IDENTITY)
		private Long id;
		
		@NotBlank(message = "Nome é Obrigatório")
		private String nome;

        @NotBlank(message = "Descrição é Obrigatória")
        private String descricao;

		public Servicos() {}

		public Servicos(Long id, @NotBlank(message = "Nome é Obrigatório") String nome,
				@NotBlank(message = "Descrição é Obrigatória") String descricao) {
			super();
			this.id = id;
			this.nome = nome;
			this.descricao = descricao;
		}

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

		public String getDescricao() {
			return descricao;
		}

		public void setDescricao(String descricao) {
			this.descricao = descricao;
		}
        
        
        
}
