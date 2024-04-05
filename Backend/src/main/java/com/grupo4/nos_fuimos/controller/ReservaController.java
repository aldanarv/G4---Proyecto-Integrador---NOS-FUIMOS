package com.grupo4.nos_fuimos.controller;


import com.grupo4.nos_fuimos.model.Producto;
import com.grupo4.nos_fuimos.model.Reserva;
import com.grupo4.nos_fuimos.model.Usuario;
import com.grupo4.nos_fuimos.service.EmailService;
import com.grupo4.nos_fuimos.service.ProductoService;
import com.grupo4.nos_fuimos.service.ReservaService;
import com.grupo4.nos_fuimos.service.UsuarioService;
import jakarta.mail.MessagingException;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/reserva")
@CrossOrigin(origins = "http://localhost:5173")
public class ReservaController {

    private final ReservaService reservaService;
    private final EmailService emailService;
    private final UsuarioService usuarioService;
    private final ProductoService productoService;

    public ReservaController(ReservaService reservaService, EmailService emailService, UsuarioService usuarioService, ProductoService productoService) {
        this.reservaService = reservaService;
        this.emailService = emailService;
        this.usuarioService = usuarioService;
        this.productoService = productoService;
    }

    @PostMapping("/guardar")
    public ResponseEntity<Reserva> guardarReserva(@RequestBody Reserva reserva) throws MessagingException {
        Optional<Usuario> usuarioOptional = usuarioService.findById(reserva.getUsuarioId());
        String nombreUsuario = "";
        String email = "";
        if(usuarioOptional.isPresent()){
            Usuario usuario = usuarioOptional.get();
            if(usuario.getNombre()!=null)
                nombreUsuario = usuario.getNombre();
            if(usuario.getApellido()!=null)
                nombreUsuario = nombreUsuario + " " + usuario.getApellido();
            email = usuario.getEmail();
        }
        Producto producto = productoService.getProductoById(reserva.getProductoId());


        emailService.enviarCorreoReserva(email,  producto.getNombre(),nombreUsuario);
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
    public List<Reserva> buscarPorUsuarioId(@PathVariable String usuarioId){
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