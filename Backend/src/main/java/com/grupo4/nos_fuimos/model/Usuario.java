package com.grupo4.nos_fuimos.model;


import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@Builder
@Document(collection = "usuario")
public class Usuario {
    @Id
    private String id;
    @Indexed
    private String nombre;
    private String apellido;
    private String password;
    private String email;
    private List<String> favoriteList;
    private boolean privilegios = false;

    public Usuario(String id, String nombre, String apellido, String password, String email, List<String> favoriteList, boolean privilegios) {
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.password = password;
        this.email = email;
        this.favoriteList = favoriteList;
        this.privilegios = privilegios;
    }

    public Usuario(String nombre, String apellido, String password, String email, List<String> favoriteList, boolean privilegios) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.password = password;
        this.email = email;
        this.favoriteList = favoriteList;
        this.privilegios = privilegios;
    }

    public Usuario() {
    }

    public boolean isPrivilegios() {
        return privilegios;
    }

    public void setPrivilegios(boolean privilegios) {
        this.privilegios = privilegios;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

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

    public String getApellido() {
        return apellido;
    }

    public void setApellido(String apellido) {
        this.apellido = apellido;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
    public List<String> getFavoriteList() {
        return favoriteList;
    }

    public void setFavoriteList(List<String> favoriteList) {
        this.favoriteList = favoriteList;
    }
    public boolean havePrivilegios() {
        return privilegios;
    }

    public void addPrivilegios() {
        this.privilegios = true;
    }
}
