import React from "react";
import styles from "../styles/card.module.css"
import { Link } from "react-router-dom";

const Card = ({ id, nombre, destino, salidaDate, vueltaDate, precio, urlImagenes }) => {
    return (
        <div>
            <div className={styles.containerCard}>
                <div className={styles.containerImage}>
                    <div className="relative">
                        <svg width="30" height="30" viewBox="0 0 24 24" fill="#00000080" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-heart absolute right-3 top-3 hover:scale-110"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" /></svg>
                    </div>
                    <Link to={"/product/" + id}>
                        <img
                            src={"data:image;base64," + urlImagenes[0]}
                            alt=""
                            className={styles.image}
                        />
                    </Link>
                </div>
                <Link to={"/product/" + id}>
                    <div className={styles.containerText}>
                        <h3 className={styles.title}>
                            {nombre}
                        </h3>

                        <p className={styles.detalle}>
                            {destino}
                        </p>

                        <div className={styles.divDetalle}>
                            <div>
                                <p className={styles.detallePersona}>Precio por persona</p>
                                <p className={styles.detallePrecio}>${precio} USD</p>
                            </div>
                            <Link to={"/product/" + id} className="px-3 py-2 font-medium text-black text-sm bg-white rounded-md border-2 border-[#E37B00] hover:bg-[#E37B00] focus:outline-none">
                                Ver más
                            </Link>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default Card;
