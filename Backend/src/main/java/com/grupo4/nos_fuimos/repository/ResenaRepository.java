package com.grupo4.nos_fuimos.repository;

import com.grupo4.nos_fuimos.model.Resena;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ResenaRepository extends MongoRepository<Resena, String> {
}
