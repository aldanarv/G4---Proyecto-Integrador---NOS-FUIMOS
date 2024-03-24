package com.grupo4.nos_fuimos.service;


import com.grupo4.nos_fuimos.model.Caracteristica;
import com.grupo4.nos_fuimos.model.Categoria;
import com.grupo4.nos_fuimos.model.Producto;
import com.grupo4.nos_fuimos.repository.CategoriaRepository;
import com.grupo4.nos_fuimos.repository.ProductoRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoriaService {

    private CategoriaRepository categoriaRepository;
    private ProductoRepository productoRepository;

    public CategoriaService(CategoriaRepository categoriaRepository, ProductoRepository productoRepository) {
        this.categoriaRepository = categoriaRepository;
        this.productoRepository = productoRepository;
    }

    public List<Categoria> getAllCategoria(){
        return categoriaRepository.findAll();
    }

    public ResponseEntity<?> addCategoria(Categoria categoria){

        Optional<Categoria> existingCategoria = categoriaRepository.findByTitulo(categoria.getTitulo());
        if (existingCategoria.isPresent())
            return ResponseEntity.status(HttpStatus.CONFLICT).body("La categoria con nombre '" + categoria.getTitulo() + "' ya existe en la base de datos");

        else{
            Categoria savedCategoria = categoriaRepository.save(categoria);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedCategoria);
        }
    }

    public Categoria getCategoriaById(String id){
        return categoriaRepository.findById(id).orElse(null);
    }


    public ResponseEntity actualizarCategoria(Categoria categoria) {
        Optional<Categoria> optionalCategoria = categoriaRepository.findById(categoria.getId());
        if(optionalCategoria.isPresent()){
            return ResponseEntity.ok(categoriaRepository.save(categoria));
        }
        else{
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Categoria no encontrada");
        }
    }

    public ResponseEntity eliminarCategoriaById(String id){
        Optional<Categoria> optionalCategoria = categoriaRepository.findById(id);
        if(optionalCategoria.isPresent()) {
            categoriaRepository.deleteById(id);
            return ResponseEntity.ok("Categoria eliminada correctamente");
        }else{
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Categoria no encontrada");
        }
    }
}



