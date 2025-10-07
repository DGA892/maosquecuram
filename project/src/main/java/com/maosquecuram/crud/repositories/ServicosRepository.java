package com.maosquecuram.crud.repositories;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.maosquecuram.crud.entities.Servicos;

@Repository
public interface ServicosRepository extends JpaRepository<Servicos, Long> {
    Optional<Servicos> findByNomeIgnoreCase(String nome);
}
