package com.grupo4.nos_fuimos.controller;


import com.grupo4.nos_fuimos.model.Reserva;
import com.grupo4.nos_fuimos.service.ReservaService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/reserva")
@CrossOrigin(origins = "http://localhost:5173")
public class ReservaController {

    private final ReservaService reservaService;

    public ReservaController(ReservaService reservaService) {
        this.reservaService = reservaService;
    }

    @PostMapping("/guardar")
    public ResponseEntity<Reserva> guardarReserva(@RequestBody Reserva reserva){
        return reservaService.guardarReserva(reserva);
    }

    @PutMapping("/actualizar")
    public ResponseEntity<Reserva> actualizarReserva(@RequestBody Reserva reserva){
        return reservaService.actualizarReserva(reserva);
    }

    @GetMapping("/listar")
    public ResponseEntity<List<Reserva>> listarReservas(){
        return reservaService.listarReservas();
    }

    @GetMapping("/buscar/{id}")
    public ResponseEntity<Reserva> buscarPorId(@PathVariable String id){
        return reservaService.findReservaById(id);
    }

    @GetMapping("/buscar/usuario-id/{usuarioId}")
    public ResponseEntity<Reserva> buscarPorUsuarioId(@PathVariable String usuarioId){
        return reservaService.findReservaByUsuarioId(usuarioId);
    }

    @GetMapping("/buscar/producto-id/{productoId}")
    public ResponseEntity<Reserva> buscarPorProductoId(@PathVariable String productoId){
        return reservaService.findReservaByProductoId(productoId);
    }

    @DeleteMapping("/borrar")
    public ResponseEntity<?> borrarReserva(@RequestBody Reserva reserva){
        return reservaService.borrarReserva(reserva);
    }

    @DeleteMapping("/borrar/{reservaId}")
    public ResponseEntity<?> borrarReservaPorId(@PathVariable String reservaId){
        return reservaService.borrarReservaPorId(reservaId);
    }
}
