package com.grupo4.nos_fuimos.model;

public class Resena {
    String id;
    String usuarioId;
    int puntuacion;
    String fecha;
    String Comentario;

    public Resena(String id, String usuarioId, int puntuacion, String fecha, String comentario) {
        this.id = id;
        this.usuarioId = usuarioId;
        this.puntuacion = puntuacion;
        this.fecha = fecha;
        Comentario = comentario;
    }

    public Resena() {
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

    public int getPuntuacion() {
        return puntuacion;
    }

    public void setPuntuacion(int puntuacion) {
        this.puntuacion = puntuacion;
    }

    public String getFecha() {
        return fecha;
    }

    public void setFecha(String fecha) {
        this.fecha = fecha;
    }

    public String getComentario() {
        return Comentario;
    }

    public void setComentario(String comentario) {
        Comentario = comentario;
    }
}
