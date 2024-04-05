package com.grupo4.nos_fuimos.model;

import jakarta.validation.constraints.NotNull;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;

@Document(collection = "reserva")
public class Reserva {
    @Id
    private String id;
    private String usuarioId;
    private String productoId;
    @NotNull
    private String fechaReserva;
    @NotNull
    private String nombreProducto;
    @NotNull
    private String destinoProducto;
    @NotNull
    private String fechaIdaProducto;
    @NotNull
    private String fechaRegresoProducto;

    public Reserva() {
    }

    public Reserva(String id, String usuarioId, String productoId, String fechaReserva, String nombreProducto, String destinoProducto, String fechaIdaProducto, String fechaRegresoProducto) {
        this.id = id;
        this.usuarioId = usuarioId;
        this.productoId = productoId;
        this.fechaReserva = fechaReserva;
        this.nombreProducto = nombreProducto;
        this.destinoProducto = destinoProducto;
        this.fechaIdaProducto = fechaIdaProducto;
        this.fechaRegresoProducto = fechaRegresoProducto;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUsuarioId() {
        return usuarioId;
    }

    public void setUsuarioId(String usuarioId) {
        this.usuarioId = usuarioId;
    }

    public String getProductoId() {
        return productoId;
    }

    public void setProductoId(String productoId) {
        this.productoId = productoId;
    }

    public String getFechaReserva() {
        return fechaReserva;
    }

    public void setFechaReserva(String fechaReserva) {
        this.fechaReserva = fechaReserva;
    }

    public String getNombreProducto() {
        return nombreProducto;
    }

    public void setNombreProducto(String nombreProducto) {
        this.nombreProducto = nombreProducto;
    }

    public String getDestinoProducto() {
        return destinoProducto;
    }

    public void setDestinoProducto(String destinoProducto) {
        this.destinoProducto = destinoProducto;
    }

    public String getFechaIdaProducto() {
        return fechaIdaProducto;
    }

    public void setFechaIdaProducto(String fechaIdaProducto) {
        this.fechaIdaProducto = fechaIdaProducto;
    }

    public String getFechaRegresoProducto() {
        return fechaRegresoProducto;
    }

    public void setFechaRegresoProducto(String fechaRegresoProducto) {
        this.fechaRegresoProducto = fechaRegresoProducto;
    }
}

