package com.grupo4.nos_fuimos.service;

import com.grupo4.nos_fuimos.model.Usuario;
import com.grupo4.nos_fuimos.repository.UsuarioRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;


@Service
@AllArgsConstructor
public class AuthUsuarioDetailsService implements UserDetailsService {

    private final UsuarioRepository usuarioRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Optional<Usuario> userOptional = usuarioRepository.findByEmail(email.toLowerCase());
        Usuario usuario = userOptional.orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado: " + email));

        if (usuario.havePrivilegios()) {
            return User.builder()
                    .username(usuario.getEmail())
                    .password(usuario.getPassword())
                    .roles("ADMIN")
                    .build();
        }

        return User.builder()
                .username(usuario.getEmail())
                .password(usuario.getPassword())
                .roles("USER")
                .build();
    }
}
