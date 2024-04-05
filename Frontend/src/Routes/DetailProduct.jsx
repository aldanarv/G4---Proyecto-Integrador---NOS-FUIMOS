import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useFetchGetID } from "../PeticionesHTTP/Productos/useFetchGetID";
import { useFetchGetIdUser } from "../PeticionesHTTP/Usuarios/useFetchGetIdUser"
import { useFetchPutFavorite } from "../PeticionesHTTP/Usuarios/useFetchPutFavorite";
import GalleryImages from "../Components/GalleryImages";
import CompartirRedes from "../Components/CompartirRedes";
import Calendario from "../Components/Calendario";
import Reviews from "../Components/Reviews";
import styles from "../styles/detailProduct.module.css";

const DetailProduct = () => {
    const [productData, setProductData] = useState(null);
    const [esFavorito, setEsFavorito] = useState(null);

    const [totalResenas, setTotalResenas] = useState(0);
    const [promedioPuntuacion, setPromedioPuntuacion] = useState(0);

    const { id } = useParams();
    const { data } = useFetchGetID("http://localhost:8080/admin/productos/" + id);

    const [isCalendarOpen, setIsCalendarOpen] = useState(false);
    const [fechasSeleccionadas, setFechasSeleccionadas] = useState({ startDate: data?.salidaDate, endDate: data?.vueltaDate });

    const idUser = localStorage.getItem("id");
    const { user } = idUser ? useFetchGetIdUser("http://localhost:8080/usuario/" + idUser) : { user: undefined };

    useEffect(() => {
        if (user && data && user.favoriteList != null) {
            setEsFavorito(user.favoriteList.includes(data.id));
            setProductData(data);
        }
    }, [user, data]);

    const handlerFav = async (id, nombre) => {
        const { fetchPutFavorite } = useFetchPutFavorite(`http://localhost:8080/usuario/addFav/${localStorage.getItem("id")}/${id}`);
        fetchPutFavorite(id)
            .then(res => {
                if (res.status == 200) {
                    setEsFavorito(res.data);
                }
            })
            .catch(error => {
                console.error("Error al actualizar el producto:", error);
            });
    };

    const toggleCalendar = () => {
        setIsCalendarOpen(!isCalendarOpen);
    };

    const handleDateSelect = (dates) => {
        setFechasSeleccionadas(dates);
    };

    useEffect(() => {
        const fetchData = async () => {
            if (data?.listResena) {
                // Mapear sobre la lista de reseñas y realizar las solicitudes de forma paralela
                const reviews = await Promise.all(data.listResena.map(async (idReview) => {
                    try {
                        const response = await axios.get("http://localhost:8080/resena/" + idReview);
                        return response.data;
                    } catch (error) {
                        console.error("Error fetching review:", error);
                        return null;
                    }
                }));
                setTotalResenas(data?.listResena.length);
                calcularPromedioPuntuacion(reviews);
            }
        };
        fetchData();
    }, [data]);

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
        <article className={styles.article}>
            <section className={styles.info}>
                <div className={styles.title}>
                    <h2 className={styles.title_h2}>{data?.nombre}</h2>
                    <div className={styles.title_back}>
                        <Link to="/" className={styles.details__buttons_back}>
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                strokeWidth="1"
                                stroke="currentColor"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className={styles.details__svgButtons}
                            >
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <path d="M5 12l14 0" />
                                <path d="M5 12l4 4" />
                                <path d="M5 12l4 -4" />
                            </svg>
                            <span className={styles.details__buttons_title}>Atrás</span>
                        </Link>
                    </div>
                </div>

                <section className={styles.gallery}>
                    <div className={styles.galleryContainer}>
                        <div className={styles.leftContainer}>
                            <img
                                src={"data:image;base64," + data?.urlImagenes[0]}
                                alt=""
                                loading="lazy"
                                className={styles.leftImg}
                            />
                        </div>
                        <div className={styles.rightContainer}>
                            {data?.urlImagenes.slice(1, 5).map((imagenes, index) => (
                                <div key={index} className={styles.rightDiv}>
                                    <img
                                        src={"data:image;base64," + imagenes}
                                        alt=""
                                        loading="lazy"
                                        className={styles.rightImg}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className={styles.more}>
                        <div className={styles.title_plus}>
                            <GalleryImages />
                        </div>
                    </div>
                </section>

                <div className="bg-[#fff7ec] rounded-2xl">
                    <div>
                        <div className="flex justify-end gap-4 mx-auto px-4 pt-10 sm:px-6 lg:max-w-7xl lg:px-8">
                            <CompartirRedes />
                            <div className="flex items-center gap-2" onClick={() => handlerFav(productData.id, productData.name)}>
                                <svg className={`icon icon-tabler icons-tabler-outline icon-tabler-heart ${productData && esFavorito ? "fill-[#fe0000]" : ""}`} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" /></svg>
                                <p className="text-sm hover:underline capitalize text-black font-normal">{productData && esFavorito ? "Favorito" : "Guardar"}</p>
                            </div>
                        </div>
                        <div className="mx-auto px-4 pb-16 pt-5 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:px-8 lg:pb-24 lg:pt-16">
                            <div className="lg:col-span-2 lg:pr-4">
                                <h1 className="text-xl font-bold text-black sm:text-2xl">{data?.destino}</h1>
                            </div>

                            <div className="mt-4 lg:row-span-3 lg:mt-0 p-4 sm:p-6 rounded-md bg-white shadow-md h-min">
                                <div className="flex flex-col sm:flex-row items-start sm:items-end sm:gap-2">
                                    <p className="text-xl text-black">${data?.precio} USD</p>
                                    <h3 className="text-sm font-light text-black">precio por persona</h3>
                                </div>
                                <div className="mt-6">
                                    <div className="flex items-center">
                                        {renderStars(promedioPuntuacion)}
                                        <p className="ml-3 text-sm font-light text-black">
                                            {totalResenas} Reseñas
                                        </p>
                                    </div>
                                </div>

                                <form className="mt-10">
                                    <div className="mt-10">
                                        <fieldset className="mt-4 border border-gray-300 rounded-md">
                                            <div className="grid grid-rows">
                                                <div className="p-2 sm:p-3">
                                                    <p className="text-sm font-medium text-black">Fecha salida - Fecha regreso</p>
                                                    <div className="flex items-center gap-1 sm:gap-4">
                                                        <p onClick={toggleCalendar} className="relative text-sm font-light text-black bg-transparent focus:outline-none pt-1 pb-1">
                                                            {data?.salidaDate && data?.vueltaDate ?
                                                                `${data.salidaDate} - ${data.vueltaDate}` :
                                                                'dd/mm/aaaa - dd/mm/aaaa'
                                                            }
                                                        </p>
                                                        <svg onClick={toggleCalendar} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-calendar-month"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 7a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12z" /><path d="M16 3v4" /><path d="M8 3v4" /><path d="M4 11h16" /><path d="M7 14h.013" /><path d="M10.01 14h.005" /><path d="M13.01 14h.005" /><path d="M16.015 14h.005" /><path d="M13.015 17h.005" /><path d="M7.01 17h.005" /><path d="M10.01 17h.005" /></svg>
                                                    </div>
                                                    {isCalendarOpen && (
                                                        <div
                                                            style={{
                                                                position: "absolute",
                                                                left: "50%",
                                                                right: "50%"
                                                            }}
                                                        >
                                                            <Calendario fechasSeleccionadas={{ startDate: data?.salidaDate, endDate: data?.vueltaDate }} />
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </fieldset>
                                    </div>

                                    <Link to={"/product/" + id + "/detailReserva"} className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-[#005B8D] px-8 py-3 text-base font-medium text-white hover:bg-white hover:text-[#005B8D] hover:border hover:border-[#005B8D] focus:outline-none">
                                        Reservar
                                    </Link>

                                </form>
                            </div>

                            <div className="py-10 lg:col-span-2 lg:col-start-1 lg:pb-16 lg:pr-4 lg:pt-6">
                                <div>
                                    <h3 className="sr-only">Description</h3>

                                    <div className="space-y-6">
                                        <p className="text-base text-black">
                                            {data?.descripcion}
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-10">
                                    <h3 className="text-lg font-medium text-black">Características</h3>
                                    <div className="mt-4">
                                        <ul className="list-none pl-4 text-md flex flex-col sm:flex-wrap sm:max-h-64">
                                            {data?.listCaracteristicas.map((caracteristica, index) => (
                                                <li key={index} className="flex items-center gap-4 mt-2">
                                                    <img
                                                        src={"data:image;base64," + caracteristica?.icono}
                                                        alt=""
                                                        className="w-6 h-6"
                                                    />
                                                    <p className="text-black">{caracteristica.nombre}</p>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Reviews />
            </section>
        </article>
    );
};

export default DetailProduct;
