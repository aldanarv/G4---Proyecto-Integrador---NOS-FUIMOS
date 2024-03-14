package com.grupo4.nos_fuimos.controller;

import com.grupo4.nos_fuimos.model.Resena;
import com.grupo4.nos_fuimos.service.ProductoService;
import com.grupo4.nos_fuimos.service.ResenaService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/resena")
@CrossOrigin(origins = "http://localhost:5173")
public class ResenaController {

    private final ResenaService resenaService;
    private final ProductoService productoService;

    public ResenaController(ResenaService resenaService, ProductoService productoService) {
        this.resenaService = resenaService;
        this.productoService = productoService;
    }

    @PostMapping("/{productoId}")
    public ResponseEntity guardarResena(@PathVariable String productoId, @RequestBody Resena resena){
        Resena resenaGuardada = resenaService.guardarReseña(resena);
        return productoService.addResena(productoId,resenaGuardada.getId());
    }

    @PutMapping("/actualizar")
    public Resena actualizarResena(@RequestBody Resena resena){
        return resenaService.actualizarResena(resena);
    }

    @DeleteMapping("/borrar/{productoId}/{resenaId}")
    public ResponseEntity borrarResena(@PathVariable String productoId, @PathVariable String resenaId){
        ResponseEntity responseEntity = resenaService.eliminarResenaById(resenaId);
        if(ResponseEntity.ok().equals(responseEntity)){
            return productoService.removeResena(productoId, resenaId);
        }
        else {
            return responseEntity;
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Resena> getResena(@PathVariable String id){
        return resenaService.getResenaById(id);
    }
}
