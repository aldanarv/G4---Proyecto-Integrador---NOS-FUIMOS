import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { format } from 'date-fns';
import { useFetchGetIdUser } from "../PeticionesHTTP/Usuarios/useFetchGetIdUser";
import { useFetchGetID } from "../PeticionesHTTP/Productos/useFetchGetID";
import { useFetchPostReserve } from '../PeticionesHTTP/Reservas/useFetchPostReserve';
import GalleryImages from "../Components/GalleryImages";
import styles from "../styles/detailProduct.module.css";

const DetailReserva = () => {

    const { id } = useParams();
    const { data } = useFetchGetID("http://localhost:8080/admin/productos/" + id);
    const userId = localStorage.getItem("id");
    const { fetchPostReserve } = useFetchPostReserve("http://localhost:8080/reserva/guardar");
    const { user } = useFetchGetIdUser("http://localhost:8080/usuario/" + userId);

    const [totalResenas, setTotalResenas] = useState(0);
    const [promedioPuntuacion, setPromedioPuntuacion] = useState(0);

    const today = new Date();
    const formattedDate = format(today, 'dd/MM/yyyy');

    const formik = useFormik({
        initialValues: {
            usuarioId: user?.id || "",
            productoId: data?.id || "",
            fechaReserva: formattedDate || "",
            nombreProducto: data?.nombre || "",
            destinoProducto: data?.destino || "",
            fechaIdaProducto: data?.salidaDate || "",
            fechaRegresoProducto: data?.vueltaDate || "",
        },
        validationSchema: Yup.object({
            usuarioId: Yup.string().trim(),
            productoId: Yup.string().trim(),
            /*
            nombreProducto: Yup.string().lowercase().trim(),
            destinoProducto: Yup.string().lowercase().trim(),
            fechaIdaProducto: Yup.date(),
            fechaRegresoProducto: Yup.date(),
            */
        }),
        onSubmit: (info) => {
            console.log("Submitted Data:", info);

            let reserve = {
                usuarioId: info.usuarioId,
                productoId: info.productoId,
                fechaReserva: info.fechaReserva,
                nombreProducto: info.nombreProducto,
                destinoProducto: info.destinoProducto,
                fechaIdaProducto: info.fechaIdaProducto,
                fechaRegresoProducto: info.fechaRegresoProducto,
            };

            console.log("reserva:", reserve);

            fetchPostReserve(reserve);
        },
        validateOnChange: false
    });

    useEffect(() => {
        if (data && user) {
            formik.setFieldValue('usuarioId', user?.id);
            formik.setFieldValue('productoId', data?.id);
            formik.setFieldValue('fechaReserva', formattedDate);
            formik.setFieldValue('nombreProducto', data?.nombre);
            formik.setFieldValue('destinoProducto', data?.destino);
            formik.setFieldValue('fechaIdaProducto', data?.salidaDate);
            formik.setFieldValue('fechaRegresoProducto', data?.vueltaDate);
        }
    }, [user, data]);

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
                    <h2 className={styles.title_h2}>Detalles de su reserva</h2>
                    <div className={styles.title_back}>
                        <Link to={"/product/" + id} className={styles.details__buttons_back}>
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

                <div className="bg-[#fffaf5] rounded-2xl mt-4">
                    <div>
                        <div className="mx-auto px-4 pb-16 pt-5 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:px-8">
                            <div className="lg:col-span-2 lg:pr-4">
                                <h1 className="text-xl font-semibold text-[#C15205] sm:text-2xl">{data?.nombre}</h1>
                            </div>

                            {/* Galeria de imagenes*/}

                            <div className="py-6 lg:col-span-2 lg:col-start-1 lg:pb-16 lg:pr-4 lg:pt-6">
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

                                {/* Descripcion y caracteristicas*/}
                                <div>
                                    <h2 className="text-lg font text-black sm:text-xl">{data?.destino}</h2>
                                    <h3 className="sr-only">{data?.descripcion}</h3>

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
                                                        src={"data:image;base64," + caracteristica.icono}
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

                            {/* card blanca*/}

                            <form onSubmit={formik.handleSubmit} className="mt-4 lg:row-span-3 lg:mt-0 p-4 sm:p-6 rounded-md bg-white shadow-md h-min">

                                {/*Datos del usuario */}

                                <div className={`mt-5`}>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label htmlFor="nombre" className="text-sm font-semibold text-black">Nombre</label>
                                            <input
                                                type="text"
                                                name="nombre"
                                                id="nombre"
                                                readOnly
                                                value={user?.nombre}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#ED9707]"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="apellido" className="text-sm font-semibold text-black">Apellido</label>
                                            <input
                                                type="text"
                                                name="apellido"
                                                id="apellido"
                                                readOnly
                                                value={user?.apellido}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#ED9707]"
                                            />
                                        </div>
                                    </div>
                                    <div className="mt-4">
                                        <label htmlFor="email" className="text-sm font-semibold text-black">Email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            id="email"
                                            readOnly
                                            value={user?.email}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#ED9707]"
                                        />
                                    </div>
                                </div>

                                <div className="mt-7">
                                    <fieldset className="mt-4 border border-gray-300">
                                    </fieldset>
                                </div>

                                {/*Datos del producto */}

                                <div className="mt-6">

                                    <div className="flex flex-col sm:flex-row items-start sm:items-end sm:gap-2">
                                        <p className="text-xl text-black">${data?.precio} USD</p>
                                        <h3 className="text-sm font-light text-black">precio por persona</h3>
                                    </div>

                                    <div className="mt-6">
                                        <div className="flex items-center">
                                            <div className="flex items-center">
                                                {renderStars(promedioPuntuacion)}
                                            </div>
                                            <p className="ml-3 text-sm font-light text-black">{totalResenas} Reseñas</p>
                                        </div>
                                    </div>

                                    <div className="mt-10">
                                        <fieldset className="mt-4 border border-gray-300 rounded-md">
                                            <div className="grid grid-rows sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                                                <div className="p-3 sm:border-r sm:border-gray-300 lg:border-r-0 xl:border-r xl:border-gray-300">
                                                    <p className="text-sm font-medium text-black">Fecha salida</p>
                                                    <p className="text-sm font-light text-black">{data?.salidaDate}</p>
                                                </div>

                                                <div className="p-3 border-t border-gray-300 sm:border-t-0 lg:border-t lg:border-gray-300 xl:border-t-0">
                                                    <p className="text-sm font-medium text-black">Fecha regreso</p>
                                                    <p className="text-sm font-light text-black">{data?.vueltaDate}</p>
                                                </div>
                                            </div>
                                        </fieldset>
                                    </div>

                                    <button type="submit" className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-[#005B8D] px-8 py-3 text-base font-medium text-white hover:bg-white hover:text-[#005B8D] hover:border hover:border-[#005B8D] focus:outline-none">
                                        Confirmar reserva
                                    </button>

                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </article>
    )
}

export default DetailReserva