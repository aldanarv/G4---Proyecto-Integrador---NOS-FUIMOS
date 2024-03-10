import React from "react";
import { Link, useParams } from "react-router-dom";
import { useFetchGetID } from "../PeticionesHTTP/Productos/useFetchGetID";
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
                                className={styles.leftImg}
                            />
                        </div>
                        <div className={styles.rightContainer}>
                            {data?.urlImagenes.slice(1, 5).map((imagenes, index) => (
                                <div key={index} className={styles.rightDiv}>
                                    <img
                                        src={"data:image;base64," + imagenes}
                                        alt=""
                                        className={styles.rightImg}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className={styles.more}>
                        <div className={styles.title_plus}>
                            <Link
                                to={"/product/" + id + "/gallery"}
                                className={styles.details__buttons}
                            >
                                <span className={styles.details__svgButtonsPlusDos}></span>
                                <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1"
                                    stroke="#5baf00"
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className={styles.details__svgButtonsPlus}
                                >
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                    <path d="M12 5l0 14" />
                                    <path d="M5 12l14 0" />
                                </svg>
                                <span className={styles.details__buttons_title}>Ver más</span>
                            </Link>
                        </div>
                    </div>
                </section>

                {data?.listCaracteristicas && (
                    <section className="text-gray-600 body-font mb-20">
                        <div className="">
                            <div className="flex flex-col w-full mb-5">
                                <h1 className="text-xl font-medium title-font text-black">Características</h1>
                            </div>
                            <div className="flex flex-wrap">
                                {data?.listCaracteristicas.map((caracteristica, index) => (
                                    <div key={index} className="p-2 lg:w-1/3 md:w-1/2 w-full">
                                        <div className="h-full flex items-center gap-4 bg-[#fff7ec] p-4 rounded-lg">
                                            <img
                                                src={"data:image;base64," + caracteristica.icono}
                                                alt=""
                                                className="w-6 h-6"
                                            />
                                            <div className="flex-grow">
                                                <p className="text-black">{caracteristica.nombre}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                <div className={styles.divContainer}>
                    <div className={styles.descriptionContainer}>
                        <div className={styles.description}>
                            <p>Destino</p>
                            <div className={styles.dataContainerDestino}>
                                <p className={styles.dataDestino}>{data?.destino}</p>
                                <div className={styles.widthColumn}></div>
                            </div>
                        </div>
                        <div className={styles.description}>
                            <p>Fecha de salida</p>
                            <div className={styles.dataContainer}>
                                <p className={styles.data}>{data?.salidaDate}</p>
                                <img width="24" height="24" src="../../public/assets/calendario.png" alt="" />
                            </div>
                        </div>
                        <div className={styles.description}>
                            <p>Fecha de regreso</p>
                            <div className={styles.dataContainer}>
                                <p className={styles.data}>{data?.vueltaDate}</p>
                                <img width="24" height="24" src="../../public/assets/calendario.png" alt="" />
                            </div>
                        </div>
                        <div className={styles.descriptionPrecio}>
                            <p>Precio por persona</p>
                            <div className={styles.dataContainer}>
                                <p className={styles.data}>{data?.precio} USD</p>
                                <div className={styles.widthColumn}></div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.price}>
                        <Link to={"/product/" + id + "/reservar"} className={styles.details__buttonsRerservar}>
                            Reservar
                        </Link>
                    </div>
                </div>
            </section>
        </article>
    );
};

export default DetailProduct;
