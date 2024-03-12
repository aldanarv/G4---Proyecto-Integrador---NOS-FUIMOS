import React from "react";
import { Link } from "react-router-dom";
import styles from "../styles/carouselcategory.module.css";
import { useFetchGetAllCategorias } from "../PeticionesHTTP/Categorias/useFetchGetAllCategorias";

const CarouselCategory = () => {
    const { categoria } = useFetchGetAllCategorias("http://localhost:8080/categorias/listar");

    return (
        <div className={styles.carouselItem__categoria}>
            {
                categoria?.map((category) => (
                    <Link key={category.id} className={styles.category__buttons}>
                        <img src={"data:image;base64," + category.imagen} alt="" width="24" height="24"/>
                        <p className={styles.carouselItem__texto}>{category.titulo}</p>
                    </Link>
                ))
            }
        </div>
    );
};

export default CarouselCategory;