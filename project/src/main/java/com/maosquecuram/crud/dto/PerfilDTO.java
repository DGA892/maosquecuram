package com.maosquecuram.crud.dto;

/** DTO usado para exibir perfil do usuário */
public record PerfilDTO(
        Long id,
        String nome,
        String email,
        String numtel,
        String dataNascimento // novo campo opcional
) {}
