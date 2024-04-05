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
    public ResponseEntity<?> guardarCategoria(@RequestBody Categoria categoria){
        List<Categoria> listCategoria = categoriaService.getAllCategoria();
        for (Categoria item : listCategoria) {
            if (item.getImagen().equals(categoria.getImagen())) {
                return ResponseEntity.badRequest().body("El icono ya existe. Elija uno diferente.");
            }
        }
        return categoriaService.addCategoria(categoria);
    }

    @PutMapping("/actualizar")
    public ResponseEntity actualizarCategoria(@RequestBody Categoria categoria) {
        categoriaService.actualizarCategoria(categoria);

        List<Producto> productosConCategoria = productoService.getProductosByCategoriaId(categoria.getId());
        for (Producto producto : productosConCategoria) {
            producto.setCategoria(categoria.getTitulo());
            productoService.actualizarProducto(producto);
        }
        return ResponseEntity.ok("Categoría actualizada y productos actualizados");
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
    public ResponseEntity borrarCategoria(@PathVariable String id) {
        // Elimina la categoría de todos los productos que la tienen asignada
        List<Producto> productosConCategoria = productoService.getProductosByCategoriaId(id);
        for (Producto producto : productosConCategoria) {
            producto.setIdCategoria(null);
            producto.setCategoria(null);
            productoService.actualizarProducto(producto);
        }
        categoriaService.eliminarCategoriaById(id);
        return ResponseEntity.ok("Categoría eliminada y productos actualizados");
    }
}
