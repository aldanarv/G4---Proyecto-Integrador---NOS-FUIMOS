package com.grupo4.nos_fuimos.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "reserva")
public class Reserva {
    @Id
    private String id;
    private String usuarioId;
    private String productoId;

    public Reserva() {
    }

    public Reserva(String id, String usuarioId, String productoId) {
        this.id = id;
        this.usuarioId = usuarioId;
        this.productoId = productoId;
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
}

