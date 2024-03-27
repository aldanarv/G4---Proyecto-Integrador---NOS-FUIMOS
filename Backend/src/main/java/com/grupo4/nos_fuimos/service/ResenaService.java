package com.grupo4.nos_fuimos.service;

import com.grupo4.nos_fuimos.model.Resena;
import com.grupo4.nos_fuimos.repository.ResenaRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;


@Service
public class ResenaService {

    private final ResenaRepository resenaRepository;

    public ResenaService(ResenaRepository resenaRepository) {
        this.resenaRepository = resenaRepository;
    }

    public Resena guardarReseña(Resena resena){
        return resenaRepository.save(resena);
    }

    public Resena actualizarResena(Resena resena){
        return resenaRepository.save(resena);
    }

    public ResponseEntity eliminarResenaById(String id){
        Optional<Resena> optionalResena = resenaRepository.findById(id);
        if(optionalResena.isPresent()){
            resenaRepository.delete(optionalResena.get());
            return  ResponseEntity.ok("Resena eliminada correctamente");
        }
        else{
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Resena no encontrada");
        }
    }

    public ResponseEntity<Resena> getResenaById(String id){
        Optional<Resena> optionalResena = resenaRepository.findById(id);
        if(optionalResena.isPresent()){
            return  ResponseEntity.ok(optionalResena.get());
        }
        else{
            return ResponseEntity.notFound().build();
        }
    }
}
