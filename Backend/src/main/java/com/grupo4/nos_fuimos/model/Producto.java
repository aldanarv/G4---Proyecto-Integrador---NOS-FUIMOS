package com.grupo4.nos_fuimos.model;

import jakarta.validation.constraints.NotNull;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Document(collection = "productos")
public class Producto {

    @Id
    private String id;
    @NotNull
    private String nombre;
    @NotNull
    private String destino;
    @NotNull
    private String descripcion;
    @NotNull
    private String idCategoria;
    @NotNull
    private String categoria;
    @NotNull
    private LocalDate salidaDate;
    @NotNull
    private LocalDate vueltaDate;
    @NotNull
    private Double precio;
    private List<String> urlImagenes;
    private List<Caracteristica> listCaracteristicas;
    private List<String> listResena;

    public Producto(String id, String nombre, String destino, String descripcion, String idCategoria, String categoria, LocalDate salidaDate, LocalDate vueltaDate, Double precio, List<String> urlImagenes, List<Caracteristica> listCaracteristicas, List<String> listResena) {
        this.id = id;
        this.nombre = nombre;
        this.destino = destino;
        this.descripcion = descripcion;
        this.idCategoria = idCategoria;
        this.categoria = categoria;
        this.salidaDate = salidaDate;
        this.vueltaDate = vueltaDate;
        this.precio = precio;
        this.urlImagenes = urlImagenes;
        this.listCaracteristicas = listCaracteristicas;
        this.listResena = listResena;
    }

    public Producto(){}

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getDestino() {
        return destino;
    }

    public void setDestino(String destino) {
        this.destino = destino;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public LocalDate getSalidaDate() {
        return salidaDate;
    }

    public void setSalidaDate(LocalDate salidaDate) {
        this.salidaDate = salidaDate;
    }

    public LocalDate getVueltaDate() {
        return vueltaDate;
    }

    public void setVueltaDate(LocalDate vueltaDate) {
        this.vueltaDate = vueltaDate;
    }

    public Double getPrecio() {
        return precio;
    }

    public void setPrecio(Double precio) {
        this.precio = precio;
    }

    public List<String> getUrlImagenes() {
        return urlImagenes;
    }

    public void setUrlImagenes(List<String> urlImagenes) {
        this.urlImagenes = urlImagenes;
    }

    public String getIdCategoria() {
        return idCategoria;
    }

    public void setIdCategoria(String idCategoria) {
        this.idCategoria = idCategoria;
    }

    public String getCategoria() {
        return categoria;
    }

    public void setCategoria(String categoria) {
        this.categoria = categoria;
    }

    public List<Caracteristica> getListCaracteristicas() {
        return listCaracteristicas;
    }

    public void setListCaracteristicas(List<Caracteristica> listCaracteristicas) {
        this.listCaracteristicas = listCaracteristicas;
    }

    public List<String> getListResena() {
        return listResena;
    }

    public void setListResena(List<String> listResena) {
        this.listResena = listResena;
    }

    public void addResena(String resenaId){
        if(listResena==null){
            listResena = new ArrayList<>();
        }

        listResena.add(resenaId);
    }

    public Boolean removeResena(String resenaId) {
        if (listResena != null && !listResena.isEmpty()) {
            for (String id : listResena) {
                if (resenaId.equals(id)) {
                    listResena.remove(id);
                    return true;
                }
            }
        }
        return false;
    }
}
