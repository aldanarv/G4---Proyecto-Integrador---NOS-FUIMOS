package com.grupo4.nos_fuimos.service;

import com.grupo4.nos_fuimos.model.Producto;
import com.grupo4.nos_fuimos.repository.ProductoRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;


@Service
public class ProductoService {

    private final ProductoRepository productoRepository;

    public ProductoService(ProductoRepository productoRepository){
        this.productoRepository = productoRepository;
    }

    public List<Producto> getAllProducto(){
        return productoRepository.findAll();
    }

    public ResponseEntity<?> addProducto(Producto producto){

        Optional<Producto> existingProduct = productoRepository.findByNombre(producto.getNombre());
        if (existingProduct.isPresent())
            return ResponseEntity.status(HttpStatus.CONFLICT).body("El producto con nombre '" + producto.getNombre() + "' ya existe en la base de datos");

        else{
            Producto savedProducto = productoRepository.save(producto);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedProducto);
        }
    }

    public Producto getProductoById(String id){
        Optional<Producto> optionalProducto = productoRepository.findById(id);
        return optionalProducto.orElse(null);
    }

    public Producto actualizarProducto(Producto producto){
        return productoRepository.save(producto);
    }

    public List<Producto> getProductosByCategoria(String categoria) {
        return productoRepository.findByCategoria(categoria);
    }

    public List<Producto> getProductosByCategoriaId(String idCategoria) {
        return productoRepository.findByIdCategoria(idCategoria);
    }

    public void deleteProducto(String id){
        productoRepository.deleteById(id);
    }

    public ResponseEntity addResena(String productoId, String resenaId){
        Optional<Producto> existingProduct = productoRepository.findById(productoId);
        if (existingProduct.isPresent()){
            Producto producto = existingProduct.get();
            producto.addResena(resenaId);
            return  ResponseEntity.ok(productoRepository.save(producto));
        }
        else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Producto no encontrado");
        }
    }

    public ResponseEntity removeResena(String productoId, String resenaId){
        Optional<Producto> existingProduct = productoRepository.findById(productoId);
        if (existingProduct.isPresent()){
            Producto producto = existingProduct.get();
            if(producto.removeResena(resenaId)){
                return  ResponseEntity.ok(productoRepository.save(producto));
            }
            else{
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Resena no encontrada en producto");
            }

        }
        else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Producto no encontrado");
        }
    }



}
