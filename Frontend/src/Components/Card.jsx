import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useFetchPutFavorite } from "../PeticionesHTTP/Usuarios/useFetchPutFavorite";
import styles from "../styles/card.module.css"

const Card = ({ id, nombre, destino, salidaDate, vueltaDate, precio, urlImagenes, fav, onFavChange }) => {
    const [esFavorito, setEsFavorito] = useState(fav);
    const { fetchPutFavorite } = useFetchPutFavorite(`http://localhost:8080/usuario/addFav/${localStorage.getItem("id")}/${id}`);

    const handlerFav = async (id, nombre ) => {
        fetchPutFavorite(id)
            .then(res => {
                if (res.status == 200) {
                    setEsFavorito(res.data);
                    onFavChange(id, res.data);
                    console.log(`Se hizo clic en el corazón favorito de la tarjeta ${nombre}`);
                }
            })
            .catch(error => {
                console.error("Error al actualizar el producto:", error);
            });
    };

    return (
        <div>
            <div className={styles.containerCard}>
                <div className={styles.containerImage}>
                    {localStorage.getItem('id') != null ? (
                        <div className="relative" onClick={() => handlerFav(id, nombre)}>
                            <svg width="30" height="30" viewBox="0 0 24 24" fill="#00000080" stroke="#ffffff" className={`icon icon-tabler icons-tabler-outline icon-tabler-heart absolute right-3 top-3 hover:scale-110 ${esFavorito ? "fill-[#fe0000]" : ""}`} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" /></svg>
                        </div>
                    ) : null}
                    <Link to={"/product/" + id}>
                        <img
                            src={"data:image;base64," + urlImagenes[0]}
                            alt=""
                            className={styles.image}
                        />
                    </Link>
                </div>
                <div className={styles.containerText}>
                    <Link to={"/product/" + id}>
                        <h3 className={styles.title}>
                            {nombre}
                        </h3>

                        <p className={styles.detalle}>
                            {destino}
                        </p>
                    </Link>
                    <div className={styles.divDetalle}>
                        <div>
                            <p className={styles.detallePersona}>Precio por persona</p>
                            <p className={styles.detallePrecio}>${precio} USD</p>
                        </div>
                        <div className="ml-auto sm:m-0">
                            <Link to={"/product/" + id} className="p-2 font-medium text-black text-sm bg-white rounded-md border-2 border-[#E37B00] hover:bg-[#E37B00] focus:outline-none">
                                Ver más
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Card;