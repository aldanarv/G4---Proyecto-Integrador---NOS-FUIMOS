import React from "react";
import { Link } from "react-router-dom";
import styles from "../styles/footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__container}>
        <div className={styles.copywriting}>
          <a href="#" className={styles.enlace}>
            <img className={styles.logo} src="/assets/logo2.png" alt="" />
          </a>
          <p className={styles.textoCopywriting}>
            ©️ 2024 Nos Fuimos.
          </p>
        </div>

        <div className={styles.navegation}>
          <Link to="/" className={styles.navegation__enlace}>Inicio</Link>
          <Link to="/politicasProducto" className={styles.navegation__enlace}>Políticas del producto</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
