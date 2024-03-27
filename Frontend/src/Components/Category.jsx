import React from "react";
import { Link } from "react-router-dom";
import styles from "../styles/category.module.css";
import { useFetchGetAllCategorias } from "../PeticionesHTTP/Categorias/useFetchGetAllCategorias";

const Category = ({ handleCategorySelect, selectedCategories }) => {
    const { categoria } = useFetchGetAllCategorias("http://localhost:8080/categorias/listar");

    return (
        <div className={styles.carouselItem__categoria}>
            {categoria?.map((category) => (
                <Link
                    key={category.id}
                    className={`${styles.category__buttons} ${selectedCategories.some((cat) => cat.id === category.id) ? styles.selected : ''}`}
                    onClick={() => handleCategorySelect(category)}
                >
                    <img src={"data:image;base64," + category.imagen} alt="" width="24" height="24" />
                    <p className={styles.carouselItem__texto}>{category.titulo}</p>
                </Link>
            ))}
        </div>
    );
};

export default Category;