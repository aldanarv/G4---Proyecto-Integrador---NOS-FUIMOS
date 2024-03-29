import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useFetchGetIdUser } from "../PeticionesHTTP/Usuarios/useFetchGetIdUser";
import { useFetchGetID } from "../PeticionesHTTP/Productos/useFetchGetID";
import GalleryImages from "../Components/GalleryImages";
import styles from "../styles/detailProduct.module.css";
import stylesForm from "../styles/login.module.css";

const DetailReserva = () => {

    const { id } = useParams();
    const { data } = useFetchGetID("http://localhost:8080/admin/productos/" + id);

    const userId = localStorage.getItem("id");
    const { user } = useFetchGetIdUser("http://localhost:8080/usuario/" + userId);

    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        email: '',
    });

    useEffect(() => {
        if (user) {
            setFormData({
                nombre: user.nombre,
                apellido: user.apellido,
                email: user.email,
            });
        }
    }, [user]);




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
                                <h1 className="text-xl font-semibold text-[#E47F07] sm:text-2xl">{data?.nombre}</h1>
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

                            <div className="mt-4 lg:row-span-3 lg:mt-0 p-4 sm:p-6 rounded-md bg-white shadow-md h-min">

                                {/*Datos del usuario */}

                                <form className={`mt-5`}>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label htmlFor="nombre" className="text-sm font-semibold text-black">Nombre</label>
                                            <input type="text" name="nombre" value={formData.nombre} readOnly className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#E47F07]" />
                                        </div>
                                        <div>
                                            <label htmlFor="apellido" className="text-sm font-semibold text-black">Apellido</label>
                                            <input type="text" name="apellido" value={formData.apellido} readOnly className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#E47F07]" />
                                        </div>
                                    </div>
                                    <div className="mt-4">
                                        <label htmlFor="email" className="text-sm font-semibold text-black">Email</label>
                                        <input type="email" name="email" value={formData.email} readOnly className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#E47F07]" />
                                    </div>
                                </form>

                                <div className="mt-7">
                                    <fieldset className="mt-4 border border-gray-300">
                                    </fieldset>
                                </div>

                                {/*Datos del producto */}

                                <form className="mt-6">

                                    <div className="flex flex-col sm:flex-row items-start sm:items-end sm:gap-2">
                                        <p className="text-xl text-black">${data?.precio} USD</p>
                                        <h3 className="text-sm font-light text-black">precio por persona</h3>
                                    </div>

                                    <div className="mt-6">
                                        <div className="flex items-center">
                                            <div className="flex items-center">
                                                <svg width="20" height="20" viewBox="0 0 24 24" fill="#E47F07" stroke="#E47F07" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-star"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" /></svg>
                                                <svg width="20" height="20" viewBox="0 0 24 24" fill="#E47F07" stroke="#E47F07" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-star"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" /></svg>
                                                <svg width="20" height="20" viewBox="0 0 24 24" fill="#E47F07" stroke="#E47F07" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-star"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" /></svg>
                                                <svg width="20" height="20" viewBox="0 0 24 24" fill="#E47F07" stroke="#E47F07" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-star"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" /></svg>
                                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#E47F07" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-star"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" /></svg>
                                            </div>
                                            <a href="#" className="ml-3 text-sm font-light text-black hover:underline">10 Reseñas</a>
                                        </div>
                                    </div>

                                    <button type="submit" className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-[#E47F07] px-8 py-3 text-base font-medium text-white hover:bg-white hover:text-[#E47F07] hover:border hover:border-[#E47F07] focus:outline-none">
                                        Confirmar reserva
                                    </button>

                                </form>
                            </div>


                        </div>
                    </div>
                </div>
            </section>
        </article>
    )
}

export default DetailReserva