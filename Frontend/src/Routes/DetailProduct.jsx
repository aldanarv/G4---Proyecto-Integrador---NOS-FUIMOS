import React from "react";
import { Link, useParams } from "react-router-dom";
import { useFetchGetID } from "../PeticionesHTTP/Productos/useFetchGetID";
import GalleryImages from "../Components/GalleryImages";
import CompartirRedes from "../Components/CompartirRedes";
import styles from "../styles/detailProduct.module.css";

const DetailProduct = () => {
    const { id } = useParams();
    const { data } = useFetchGetID("http://localhost:8080/admin/productos/" + id);

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
                            <div className="flex items-center gap-2">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-heart"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" /></svg>
                                <p className="text-sm hover:underline capitalize text-black font-normal">Guardar</p>
                            </div>
                        </div>
                        <div className="mx-auto px-4 pb-16 pt-5 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:px-8 lg:pb-24 lg:pt-16">
                            <div className="lg:col-span-2 lg:pr-4">
                                <h1 className="text-xl font-bold text-black sm:text-2xl">{data?.destino}</h1>
                            </div>

                            <div className="mt-4 lg:row-span-3 lg:mt-0 p-4 sm:p-6 rounded-md bg-white shadow-md">
                                <div className="flex flex-col sm:flex-row items-start sm:items-end sm:gap-2">
                                    <p className="text-xl text-black">${data?.precio} USD</p>
                                    <h3 className="text-sm font-light text-black">precio por persona</h3>
                                </div>
                                <div className="mt-6">
                                    <div className="flex items-center">
                                        <div className="flex items-center">
                                            <svg className="text-black h-5 w-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clipRule="evenodd" />
                                            </svg>
                                            <svg className="text-black h-5 w-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clipRule="evenodd" />
                                            </svg>
                                            <svg className="text-black h-5 w-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clipRule="evenodd" />
                                            </svg>
                                            <svg className="text-black h-5 w-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clipRule="evenodd" />
                                            </svg>
                                            <svg className="text-gray-200 h-5 w-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <a href="#" className="ml-3 text-sm font-light text-black hover:underline">10 Reseñas</a>
                                    </div>
                                </div>

                                <form className="mt-10">
                                    <div className="mt-10">
                                        <fieldset className="mt-4 border border-gray-300 rounded-md">
                                            <div className="grid grid-rows sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                                                <div className="p-3 sm:border-r sm:border-gray-300 lg:border-r-0 xl:border-r xl:border-gray-300">
                                                    <p className="text-sm font-medium text-black">Fecha salida</p>
                                                    <p className="text-sm font-light text-black">{data?.salidaDate}</p>
                                                    <input className="text-sm font-light text-black bg-transparent focus:outline-none pt-1 pb-1" type="date" name="" id="" />
                                                </div>

                                                <div className="p-3 border-t border-gray-300 sm:border-t-0 lg:border-t lg:border-gray-300 xl:border-t-0">
                                                    <p className="text-sm font-medium text-black">Fecha regreso</p>
                                                    <p className="text-sm font-light text-black">{data?.vueltaDate}</p>
                                                    <input className="text-sm font-light text-black bg-transparent focus:outline-none pt-1 pb-1" type="date" name="" id="" />
                                                </div>
                                            </div>
                                        </fieldset>
                                    </div>

                                    <Link to={"/product/" + id + "/reservar"} className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-[#E47F07] px-8 py-3 text-base font-medium text-white hover:bg-white hover:text-[#E47F07] hover:border hover:border-[#E47F07] focus:outline-none">
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
                                        {data?.listCaracteristicas.map((caracteristica, index) => (
                                            <ul key={index} role="list" className="list-none pl-4 text-md">
                                                <li className="flex items-center gap-4 mt-2">
                                                    <img
                                                        src={"data:image;base64," + caracteristica.icono}
                                                        alt=""
                                                        className="w-6 h-6"
                                                    />
                                                    <p className="text-black">{caracteristica.nombre}</p>
                                                </li>
                                            </ul>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </article>
    );
};

export default DetailProduct;
