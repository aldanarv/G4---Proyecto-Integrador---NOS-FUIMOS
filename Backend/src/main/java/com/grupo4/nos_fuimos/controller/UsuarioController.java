package com.grupo4.nos_fuimos.controller;


import com.grupo4.nos_fuimos.model.Usuario;
import com.grupo4.nos_fuimos.service.EmailService;
import com.grupo4.nos_fuimos.service.UsuarioService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/usuario")
@CrossOrigin(origins = "http://localhost:5173")
public class UsuarioController {
    private final UsuarioService usuarioService;
    private final PasswordEncoder passwordEncoder;
    private final EmailService emailService;

    public UsuarioController(UsuarioService usuarioService, PasswordEncoder passwordEncoder, EmailService emailService){
        this.usuarioService = usuarioService;
        this.passwordEncoder = passwordEncoder;
        this.emailService = emailService;
    }

    @PostMapping("/registrarse")
    public ResponseEntity registrarUsuario(@RequestBody Usuario usuario){
        try{
            if(usuarioService.findByEmail(usuario.getEmail()).isPresent())
                return ResponseEntity.status(HttpStatus.CONFLICT).body("Usuario registrado");
            usuario.setPassword(passwordEncoder.encode(usuario.getPassword()));
            Usuario usuarioCreado = usuarioService.guardarUsuario(usuario);
            emailService.enviarCorreoConfirmacion(usuarioCreado.getEmail());
            return ResponseEntity.ok().body(usuarioCreado);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(e.getMessage());
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

    @GetMapping("/{id}")
    public Usuario devolverUsuario(@PathVariable String id){
        Usuario usuario = usuarioService.findById(id).get();
        return usuario;
    }

    @GetMapping("/listar")
    public List<Usuario> listarUsuarios(){
        return usuarioService.getAll();
    }

}
