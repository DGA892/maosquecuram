package com.maosquecuram.crud.dto;

/** DTO usado para listar usuários ou retornar dados do usuário logado */
public record UserDTO(
        String nome,
        String email,
        String numtel,
        String senha,
        String dataNascimento // novo campo opcional
) {}
