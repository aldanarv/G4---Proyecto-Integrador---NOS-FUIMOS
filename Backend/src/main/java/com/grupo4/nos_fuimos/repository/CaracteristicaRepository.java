package com.grupo4.nos_fuimos.repository;

import com.grupo4.nos_fuimos.model.Caracteristica;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CaracteristicaRepository extends MongoRepository<Caracteristica, String> {
    Optional<Caracteristica> findByNombre(String nombre);
}