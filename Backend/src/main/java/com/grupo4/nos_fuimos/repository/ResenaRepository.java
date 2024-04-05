package com.grupo4.nos_fuimos.repository;

import com.grupo4.nos_fuimos.model.Resena;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ResenaRepository extends MongoRepository<Resena, String> {
}
