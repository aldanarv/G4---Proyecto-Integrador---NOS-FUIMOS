package com.grupo4.nos_fuimos.repository;

import com.grupo4.nos_fuimos.model.Producto;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.List;


@Repository
public interface ProductoRepository extends MongoRepository<Producto, String> {
    Optional<Producto> findByNombre(String nombre);
    List<Producto> findByCategoria(String categoria);
}
