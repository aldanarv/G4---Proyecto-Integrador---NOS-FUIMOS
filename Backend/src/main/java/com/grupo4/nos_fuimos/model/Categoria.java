package com.grupo4.nos_fuimos.model;


import jakarta.validation.constraints.NotNull;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "categorias")
public class Categoria {

    @Id
    private String id;
    @NotNull
    private String titulo;
    @NotNull
    private String descripcion;
    @NotNull
    private String imagen;

    private List<String> idProductos;

    public Categoria() {
    }

    public Categoria(String id, String titulo, String descripcion, String imagen, List<String> idProductos) {
        this.id = id;
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.imagen = imagen;
        this.idProductos = idProductos;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getImagen() {
        return imagen;
    }

    public void setImagen(String imagen) {
        this.imagen = imagen;
    }

    public List<String> getIdProductos() {
        return idProductos;
    }

    public void setIdProductos(List<String> idProductos) {
        this.idProductos = idProductos;
    }
}
