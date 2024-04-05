package com.grupo4.nos_fuimos.service;

import com.grupo4.nos_fuimos.model.Usuario;
import com.grupo4.nos_fuimos.repository.UsuarioRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService {
    private final UsuarioRepository usuarioRepository;

    public UsuarioService(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    public List<Usuario> getAll(){
        return usuarioRepository.findAll();
    }

    public Optional<Usuario> findById(String id){
        return usuarioRepository.findById(id);
    }

    public Optional<Usuario> findByEmail(String email){
        return usuarioRepository.findByEmail(email);
    }

    public Usuario guardarUsuario(Usuario usuario){
        return usuarioRepository.save(usuario);
    }

    public ResponseEntity actualizarUsuario(Usuario usuario){
        Usuario usuarioActualizado = usuarioRepository.save(usuario);
        if (usuarioActualizado != null) {
            return ResponseEntity.status(HttpStatus.OK).body("Usuario actualizado correctamente");
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al actualizar el usuario");
        }

    }

    public ResponseEntity eliminarUsuarioById(String id){
        Optional<Usuario> optionalUsuario = usuarioRepository.findById(id);
        if(optionalUsuario.isPresent()){
            Usuario usuario = optionalUsuario.get();
            usuarioRepository.delete(usuario);
            return ResponseEntity.ok("Usuario eliminado exitosamente");
        }
        else{
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuario no encontrado");
        }
    }
}
