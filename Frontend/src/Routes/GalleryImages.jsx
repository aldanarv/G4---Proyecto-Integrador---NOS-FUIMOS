import React from "react";
import { useParams, Link } from "react-router-dom";
import { useFetchGetID } from "../PeticionesHTTP/Productos/useFetchGetID";
import styles from "../styles/galleryImages.module.css";

const GalleryImages = () => {
    const { id } = useParams();
    const { data } = useFetchGetID("http://localhost:8080/admin/productos/" + id);
    console.log(data);

    return (
        <div className={styles.gallery}>
            <div className={styles.galleryDiv1}>
                <div className={styles.galleryDiv2}>
                    <div className={styles.galleryDiv3}>
                        <Link to={"/product/" + id}>
                            <button type="button" className={styles.button}>
                                <svg
                                    className={styles.close}
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.25"
                                    stroke="#000000"
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                    <path d="M18 6l-12 12" />
                                    <path d="M6 6l12 12" />
                                </svg>
                            </button>
                        </Link>
                        <div className={styles.containerImg}>
                            {data?.urlImagenes.map((imagenes, index) => (
                                <img
                                    key={index}
                                    className={styles.img}
                                    src={"data:image;base64," + imagenes}
                                    alt=""
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GalleryImages;
