package com.grupo4.nos_fuimos.controller;

import com.grupo4.nos_fuimos.model.Producto;
import com.grupo4.nos_fuimos.model.Usuario;
import com.grupo4.nos_fuimos.service.ProductoService;
import com.grupo4.nos_fuimos.service.UsuarioService;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/admin")
@CrossOrigin(origins = "http://localhost:5173")
public class AdminController {

    private final ProductoService productoService;
    private UsuarioService usuarioService;

    public AdminController(ProductoService productoService, UsuarioService usuarioService){
        this.usuarioService = usuarioService;
        this.productoService = productoService;
    }

    @PostMapping("/productos/guardar")
    public ResponseEntity<?> guardarProducto(@RequestBody Producto producto){
        return productoService.addProducto(producto);
    }

    @GetMapping(value = "/productos")
    public List<Producto> listarProductos(Model model){
        return productoService.getAllProducto();
    }

    @GetMapping ("/productos/{id}")
    public Producto obtenerProducto(@PathVariable String id){
        return productoService.getProductoById(id);
    }

    @PutMapping("/productos/actualizar")
    Producto actualizarProducto(@RequestBody Producto producto){
        return productoService.actualizarProducto(producto);
    }

    @DeleteMapping("/productos/{id}")
    public String eliminarProducto(@PathVariable String id){
        productoService.deleteProducto(id);
        return "Producto eliminado";
    }


    @PostMapping("/crear-admin/{id}")
    public ResponseEntity crearAdmin(@PathVariable String id) {
        Optional<Usuario> usuario = usuarioService.findById(id);
        if(!usuario.isPresent())
            return ResponseEntity.badRequest().build();

        Usuario e = usuario.get();
        e.addPrivilegios();
        usuarioService.actualizarUsuario(e);

        return ResponseEntity.ok("El usuario: " + e.getEmail() + " ahora tiene privilegios de ADMIN");
    }


}
