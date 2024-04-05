package com.grupo4.nos_fuimos.service;

import com.grupo4.nos_fuimos.model.Reserva;
import com.grupo4.nos_fuimos.repository.ReservaRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ReservaService {
    private final ReservaRepository reservaRepository;

    public ReservaService(ReservaRepository reservaRepository) {
        this.reservaRepository = reservaRepository;
    }

    public ResponseEntity<Reserva> guardarReserva(Reserva reserva) {
        Optional<Reserva> reservaOptional = Optional.of(reservaRepository.save(reserva));
        if (reservaOptional.isPresent()) {
            return ResponseEntity.ok(reservaOptional.get());
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    public ResponseEntity<Reserva> actualizarReserva(Reserva reserva) {
        Optional<Reserva> reservaOptional = reservaRepository.findById(reserva.getId());
        if (reservaOptional.isPresent()) {
            return ResponseEntity.ok(reservaRepository.save(reservaOptional.get()));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    public ResponseEntity<List<Reserva>> listarReservas() {
        Optional<List<Reserva>> listadoReservas = Optional.of(reservaRepository.findAll());
        if (listadoReservas.isPresent()) {
            return ResponseEntity.ok(listadoReservas.get());
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    public ResponseEntity<Reserva> findReservaById(String id) {
        Optional<Reserva> reserva = reservaRepository.findById(id);
        if (reserva.isPresent()) {
            return ResponseEntity.ok(reserva.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    public List<Reserva> findReservaByUsuarioId(String usuarioId) {
        return reservaRepository.findByUsuarioId(usuarioId);
    }


    public ResponseEntity<Reserva> findReservaByProductoId(String productoId) {
        Optional<Reserva> reserva = reservaRepository.findByProductoId(productoId);
        if (reserva.isPresent()) {
            return ResponseEntity.ok(reserva.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    public ResponseEntity<?> borrarReserva(Reserva reserva) {
        try {
            reservaRepository.delete(reserva);
            return ResponseEntity.status(HttpStatus.OK).build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    public ResponseEntity<?> borrarReservaPorId(String reservaId){
        try{
            reservaRepository.deleteById(reservaId);
            return ResponseEntity.status(HttpStatus.OK).build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

}
