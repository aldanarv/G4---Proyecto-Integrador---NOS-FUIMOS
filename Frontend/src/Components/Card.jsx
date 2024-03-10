import React from "react";
import styles from "../styles/card.module.css"
import { Link } from "react-router-dom";

const Card = ({ id, nombre, destino, salidaDate, vueltaDate, precio, urlImagenes }) => {
    return (
        <div>
            <Link to={"/product/" + id}>
                <div className={styles.containerCard}>
                    <div className={styles.containerImage}>
                        <img
                            src={"data:image;base64," + urlImagenes[0]}
                            alt=""
                            className={styles.image}
                        />
                    </div>
                    <div className={styles.containerText}>
                        <h3 className={styles.title}>
                            {nombre}
                        </h3>

                        <p className={styles.detalle}>
                            {destino}
                        </p>
                        <p className={styles.detalle}>
                            Fecha de viaje {salidaDate}
                        </p>
                        <p className={styles.detalle}>
                            Fecha retorno {vueltaDate}
                        </p>

                        <div className={styles.divDetalle}>
                            <div>
                                <p className={styles.detallePersona}>Precio por persona</p>
                                <p className={styles.detallePrecio}>${precio}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default Card;
