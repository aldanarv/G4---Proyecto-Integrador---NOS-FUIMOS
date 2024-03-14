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

    @PostMapping("/{id}/guardar-producto")
    public Categoria guardarProductoEnCategoria(@PathVariable String id, @RequestBody List<String> productosId){
        return categoriaService.updateCategoria(productosId, id);
    }

    @GetMapping("/{id}/productos")
    public List<Producto> listarProductoPorCategoria(@PathVariable String id){
        Categoria categoria = categoriaService.getCategoriaById(id);
        List<Producto> listaProductos = new ArrayList<>();
        if(categoria!=null){
            for(String idProducto : categoria.getIdProductos()){
                Producto producto = productoService.getProductoById(idProducto);
                if(producto!=null)
                    listaProductos.add(producto);
            }
        }
        return listaProductos;
    }
}
