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

    public Categoria addCategoria(Categoria categoria){
        return categoriaRepository.save(categoria);
    }

    public Categoria getCategoriaById(String id){
        return categoriaRepository.findById(id).orElse(null);
    }

    public Categoria updateCategoria(List<String> productosId, String idCategoria){
        Categoria categoriaEncontrada = getCategoriaById(idCategoria);
        if (categoriaEncontrada != null){
            categoriaEncontrada.setIdProductos(productosId);
            return categoriaRepository.save(categoriaEncontrada);
        }
        return null;
    }

    public void deleteCategoria(String id){
        categoriaRepository.deleteById(id);
    }


    }



