import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useFetchPutFavorite } from "../PeticionesHTTP/Usuarios/useFetchPutFavorite";
import styles from "../styles/card.module.css"

const Card = ({ id, nombre, destino, descripcion, salidaDate, vueltaDate, precio, urlImagenes, fav, onFavChange, listResena }) => {
    const [esFavorito, setEsFavorito] = useState(fav);
    const { fetchPutFavorite } = useFetchPutFavorite(`http://localhost:8080/usuario/addFav/${localStorage.getItem("id")}/${id}`);

    const handlerFav = async (id, nombre) => {
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

    const [totalResenas, setTotalResenas] = useState(0);
    const [promedioPuntuacion, setPromedioPuntuacion] = useState(0);
    console.log(listResena);
    useEffect(() => {
        const fetchData = async () => {
            if (listResena) {
                // Mapear sobre la lista de reseñas y realizar las solicitudes de forma paralela
                const reviews = await Promise.all(listResena.map(async (idReview) => {
                    try {
                        const response = await axios.get("http://localhost:8080/resena/" + idReview);
                        return response.data;
                    } catch (error) {
                        console.error("Error fetching review:", error);
                        return null;
                    }
                }));
                setTotalResenas(listResena.length);
                calcularPromedioPuntuacion(reviews);
            }
        };
        fetchData();
    }, [listResena]);

    const calcularPromedioPuntuacion = (resenas) => {
        if (resenas && resenas.length > 0) {
            let totalPuntuacion = 0;
            resenas.forEach((resena) => {
                totalPuntuacion += resena.puntuacion;
            });
            const promedio = totalPuntuacion / resenas.length;
            setPromedioPuntuacion(promedio);
        }
    };

    // Función para renderizar las estrellas según la puntuación
    const renderStars = (rating) => {
        const stars = [];
        for (let i = 0; i < 5; i++) {
            if (i < rating) {
                stars.push(<svg key={i} width="20" height="20" viewBox="0 0 24 24" fill="#E47F07" stroke="#E47F07" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-star"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" /></svg>);
            } else {
                stars.push(<svg key={i} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#E47F07" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-star"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" /></svg>);
            }
        }
        return stars;
    };

    return (
        <div>
            <div className={styles.containerCard}>
                <div className={styles.containerImage}>
                    {localStorage.getItem('id') != null ? (
                        <div className="relative" onClick={() => handlerFav(id, nombre)}>
                            <svg width="30" height="30" viewBox="0 0 24 24" fill="#00000080" stroke="#ffffff" className={`icon icon-tabler icons-tabler-outline icon-tabler-heart absolute right-3 top-3 hover:scale-110 ${esFavorito ? "fill-[#fe0000]" : ""}`} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" /></svg>
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

                        <div className="mb-3">
                            <div className="flex items-center justify-start">
                                <div className="flex items-center">
                                    {renderStars(promedioPuntuacion)}
                                </div>
                                <p className="ml-3 text-sm font-light text-black">{totalResenas} Reseñas</p>
                            </div>
                        </div>

                        <p className={styles.detalle}>
                            {descripcion}
                        </p>
                    </Link>
                    <div className={styles.divDetalle}>
                        <div>
                            <p className={styles.detallePersona}>Precio por persona</p>
                            <p className={styles.detallePrecio}>${precio} USD</p>
                        </div>
                        <div className="ml-auto sm:m-0">
                            <Link to={"/product/" + id} className="p-2 font-medium text-black text-sm bg-white rounded-md border-2 border-[#ED9707] hover:bg-[#ED9707] focus:outline-none">
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