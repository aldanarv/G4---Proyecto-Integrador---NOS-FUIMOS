package com.grupo4.nos_fuimos.controller;


import com.grupo4.nos_fuimos.model.Producto;
import com.grupo4.nos_fuimos.model.Usuario;
import com.grupo4.nos_fuimos.service.EmailService;
import com.grupo4.nos_fuimos.service.ProductoService;
import com.grupo4.nos_fuimos.service.UsuarioService;
import jakarta.mail.MessagingException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/usuario")
@CrossOrigin(origins = "http://localhost:5173")
public class UsuarioController {
    private final UsuarioService usuarioService;
    private final PasswordEncoder passwordEncoder;
    private final EmailService emailService;
    private final ProductoService productoService;

    public UsuarioController(UsuarioService usuarioService, PasswordEncoder passwordEncoder, EmailService emailService, ProductoService productoService) {
        this.usuarioService = usuarioService;
        this.passwordEncoder = passwordEncoder;
        this.emailService = emailService;
        this.productoService = productoService;
    }

    @PostMapping("/registrarse")
    public ResponseEntity registrarUsuario(@RequestBody Usuario usuario){
        try{
            if(usuarioService.findByEmail(usuario.getEmail()).isPresent())
                return ResponseEntity.status(HttpStatus.CONFLICT).body("Usuario registrado");
            usuario.setPassword(passwordEncoder.encode(usuario.getPassword()));
            Usuario usuarioCreado = usuarioService.guardarUsuario(usuario);
            String nombre = "";
            String apellido = "";
            if(usuario.getNombre()!=null){
                nombre = usuario.getNombre();
            }
            if(usuario.getApellido()!=null){
                apellido = usuario.getApellido();
            }
            emailService.enviarCorreoConfirmacion(usuario.getEmail(), (nombre + " " + apellido));
            return ResponseEntity.ok().body(usuarioCreado);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(e.getMessage());
        }
    }

    @PostMapping("/confirmacion-email")
    public ResponseEntity reenviarEmail(@RequestBody Usuario usuario) throws MessagingException {
        Optional<Usuario> usuarioEncontrado = usuarioService.findByEmail(usuario.getEmail());
        if(usuarioEncontrado.isPresent()){
            String email = usuario.getEmail();
            String nombre = "";
            String apellido = "";
            if(usuario.getNombre()!=null){
                nombre = usuario.getNombre();
            }
            if(usuario.getApellido()!=null){
                apellido = usuario.getApellido();
            }
            emailService.enviarCorreoConfirmacion(email, (nombre + " " + apellido));
            return ResponseEntity.ok().body("Email reenviado correctamente");
        }
        else{
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("El usuario no fue creado");
        }
    }

    @PostMapping("/iniciar-sesion")
    public ResponseEntity iniciarSesion(@RequestBody Usuario usuario) {
        try {
            Optional<Usuario> usuarioOptional = usuarioService.findByEmail(usuario.getEmail());
            if (usuarioOptional.isPresent()) {
                Usuario usuarioBD = usuarioOptional.get();
                if (passwordEncoder.matches(usuario.getPassword(), usuarioBD.getPassword())) {
                    return ResponseEntity.ok().body(usuarioBD);
                } else {
                    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Contraseña incorrecta");
                }
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuario no encontrado");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error interno del servidor");
        }
    }

    @PutMapping("/actualizar")
    public ResponseEntity actualizarUsuario(@RequestBody Usuario usuario){
        try {
            Optional<Usuario> usuarioOptional = usuarioService.findByEmail(usuario.getEmail());
            if (usuarioOptional.isPresent()) {
                Usuario usuarioBD = usuarioOptional.get();
                /*
                if(!usuarioBD.getPassword().equals(passwordEncoder.encode(usuario.getPassword())))
                    usuarioBD.setPassword(passwordEncoder.encode(usuario.getPassword()));
                 */
                if(!usuarioBD.getNombre().equals(usuario.getNombre()))
                    usuarioBD.setNombre(usuario.getNombre());
                if(usuario.isPrivilegios() != usuarioBD.isPrivilegios())
                    usuarioBD.setPrivilegios(usuario.isPrivilegios());
                return ResponseEntity.ok(usuarioService.actualizarUsuario(usuarioBD));
            }
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuario no encontrado");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error interno del servidor");
        }
    }

    @PutMapping("/addFav/{id}/{idProduct}")
    public ResponseEntity añadirFavorito(@PathVariable String id, @PathVariable String idProduct) {
        Usuario usuario = usuarioService.findById(id).orElse(null);
        if (usuario == null) {
            return ResponseEntity.notFound().build();
        }

        Producto producto = productoService.getProductoById(idProduct);
        if (producto == null) {
            return ResponseEntity.notFound().build();
        }

        List<String> favoriteList = usuario.getFavoriteList();
        if (favoriteList == null) {
            favoriteList = new ArrayList<>();
            usuario.setFavoriteList(favoriteList);
        }

        if (favoriteList.contains(idProduct)) {
            favoriteList.remove(idProduct);
            usuarioService.actualizarUsuario(usuario);
            return ResponseEntity.ok().body(false);
        }else{
            favoriteList.add(idProduct);
            usuarioService.actualizarUsuario(usuario);
            return ResponseEntity.ok().body(true);
        }
    }

    @GetMapping("/{id}")
    public Usuario devolverUsuario(@PathVariable String id){
        Usuario usuario = usuarioService.findById(id).get();
        return usuario;
    }

    @GetMapping("/listar")
    public List<Usuario> listarUsuarios(){
        return usuarioService.getAll();
    }

    @DeleteMapping("/borrar/{id}")
    public ResponseEntity eliminarUsuario(@PathVariable String id){
        return usuarioService.eliminarUsuarioById(id);
    }


    @GetMapping("/nombre/{id}")
    public String nombreUsuario(@PathVariable String id){
        Optional <Usuario> usuario = usuarioService.findById(id);
        if(usuario.isPresent()){
            Usuario usuarioEncontrado = usuario.get();
            return (usuarioEncontrado.getNombre() + usuarioEncontrado.getApellido());
        }
        return "Usuario no encontrado";
    }

    @GetMapping("/email/{id}")
    public String emailUsuario(@PathVariable String id){
        Optional <Usuario> usuario = usuarioService.findById(id);
        if(usuario.isPresent()){
            return usuario.get().getEmail();
        }
        return "Usuario no encontrado";
    }
}