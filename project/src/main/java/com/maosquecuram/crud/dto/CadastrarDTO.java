package com.maosquecuram.crud.dto;

/** DTO usado para cadastro de usuários */
public record CadastrarDTO(
        String nome,
        String email,
        String numtel,
        String senha,
        String dataNascimento // novo campo opcional
) {}
