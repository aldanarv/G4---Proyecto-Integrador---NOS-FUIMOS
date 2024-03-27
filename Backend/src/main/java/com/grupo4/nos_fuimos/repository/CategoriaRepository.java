package com.grupo4.nos_fuimos.repository;

import com.grupo4.nos_fuimos.model.Caracteristica;
import com.grupo4.nos_fuimos.model.Categoria;
import com.grupo4.nos_fuimos.model.Producto;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CategoriaRepository extends MongoRepository<Categoria, String> {
    Optional<Categoria> findByTitulo(String titulo);
}
