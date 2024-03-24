package com.grupo4.nos_fuimos.service;

import com.grupo4.nos_fuimos.model.Caracteristica;
import com.grupo4.nos_fuimos.repository.CaracteristicaRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CaracteristicaService {

    private final CaracteristicaRepository caracteristicaRepository;

    public CaracteristicaService(CaracteristicaRepository caracteristicaRepository){
        this.caracteristicaRepository = caracteristicaRepository;
    }

    public List<Caracteristica> getAllCaracteristica(){
        return caracteristicaRepository.findAll();
    }

    public ResponseEntity<?> addCaracteristica(Caracteristica caracteristica){

        Optional<Caracteristica> existingCaracteristica = caracteristicaRepository.findByNombre(caracteristica.getNombre());
        if (existingCaracteristica.isPresent())
            return ResponseEntity.status(HttpStatus.CONFLICT).body("La caracteristica con nombre '" + caracteristica.getNombre() + "' ya existe en la base de datos");

        else{
            Caracteristica savedCaracteristica = caracteristicaRepository.save(caracteristica);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedCaracteristica);
        }
    }

    public Caracteristica getCaracteristicaById(String id){
        Optional<Caracteristica> optionalCaracteristica = caracteristicaRepository.findById(id);
        return optionalCaracteristica.orElse(null);
    }

    public Caracteristica actualizarCaracteristica(Caracteristica caracteristica){
        return caracteristicaRepository.save(caracteristica);
    }

    public void deleteCaracteristica(String id){
        caracteristicaRepository.deleteById(id);
    }

}