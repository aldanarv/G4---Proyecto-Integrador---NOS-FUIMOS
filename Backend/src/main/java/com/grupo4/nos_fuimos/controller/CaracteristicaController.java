package com.grupo4.nos_fuimos.controller;

import com.grupo4.nos_fuimos.model.Caracteristica;
import com.grupo4.nos_fuimos.service.CaracteristicaService;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")
@CrossOrigin(origins = "http://localhost:5173")
public class CaracteristicaController {

    private final CaracteristicaService caracteristicaService;

    public CaracteristicaController(CaracteristicaService caracteristicaService){
        this.caracteristicaService = caracteristicaService;
    }

    @PostMapping("/caracteristica/guardar")
    public ResponseEntity<?> guardarCaracteristica(@RequestBody Caracteristica caracteristica) {

        List<Caracteristica> listCaracteristica = caracteristicaService.getAllCaracteristica();
        for (Caracteristica item : listCaracteristica) {
            if (item.getIcono().equals(caracteristica.getIcono())) {
                return ResponseEntity.badRequest().body("El icono ya existe. Elija uno diferente.");
            }
        }

        return caracteristicaService.addCaracteristica(caracteristica);
    }

    @GetMapping(value = "/caracteristica")
    public List<Caracteristica> listarCaracteristica(Model model){
        return caracteristicaService.getAllCaracteristica();
    }

    @GetMapping ("/caracteristica/{id}")
    public Caracteristica obtenerCaracteristica(@PathVariable String id){
        return caracteristicaService.getCaracteristicaById(id);
    }

    @PutMapping("/caracteristica/actualizar")
    Caracteristica actualizarCaracteristica(@RequestBody Caracteristica caracteristica){
        return caracteristicaService.actualizarCaracteristica(caracteristica);
    }

    @DeleteMapping("/caracteristica/{id}")
    public String eliminarCaracteristica(@PathVariable String id){
        caracteristicaService.deleteCaracteristica(id);
        return "Caracteristica eliminada";
    }
}