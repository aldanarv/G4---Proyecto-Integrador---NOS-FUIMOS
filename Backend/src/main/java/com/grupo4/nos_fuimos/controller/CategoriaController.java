package com.grupo4.nos_fuimos.controller;


import com.grupo4.nos_fuimos.model.Categoria;
import com.grupo4.nos_fuimos.model.Producto;
import com.grupo4.nos_fuimos.service.CategoriaService;
import com.grupo4.nos_fuimos.service.ProductoService;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/categorias")
@CrossOrigin(origins = "http://localhost:5173")
public class CategoriaController {
    private final ProductoService productoService;
    private final CategoriaService categoriaService;

    public CategoriaController(ProductoService productoService, CategoriaService categoriaService) {
        this.productoService = productoService;
        this.categoriaService = categoriaService;
    }

    @PostMapping("/guardar")
    public Categoria guardarCategoria(@RequestBody Categoria categoria){
        return categoriaService.addCategoria(categoria);
    }

    @PutMapping("/actualizar")
    public ResponseEntity actualizarCategoria(@RequestBody Categoria categoria){
        return categoriaService.actualizarCategoria(categoria);
    }

    @GetMapping(value = "/listar")
    public List<Categoria> listarCategorias(Model model){
        return categoriaService.getAllCategoria();
    }

    @GetMapping ("/{id}")
    public Categoria obtenerCategoria(@PathVariable String id){
        return categoriaService.getCategoriaById(id);
    }


    @DeleteMapping("/borrar/{id}")
    public ResponseEntity borrarCategoria(@PathVariable String id){
        return categoriaService.eliminarCategoriaById(id);
    }

}
