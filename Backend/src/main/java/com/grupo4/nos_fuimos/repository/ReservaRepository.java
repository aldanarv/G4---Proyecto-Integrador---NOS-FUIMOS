package com.grupo4.nos_fuimos.repository;

import com.grupo4.nos_fuimos.model.Reserva;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.List;

@Repository
public interface ReservaRepository extends MongoRepository<Reserva, String> {

    List<Reserva> findByUsuarioId(String usuarioId);
    Optional<Reserva> findByProductoId(String productoId);
}