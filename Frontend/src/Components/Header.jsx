import React from "react";
import { Link } from 'react-router-dom';
import NavMobile from "./ui/Buttons/NavMobile";
import Avatar from "./Avatar";
import { useContextGlobal } from "../Context/global.context";
import styles from "../styles/header.module.css";

const Header = () => {
    const { state } = useContextGlobal();

    return (
        <header className={styles.header}>
            <div className={styles.header__container}>
                {/*Logotipo y titulo*/}
                <div className={styles.logo}>
                    <Link className={styles.enlace} to="/">
                        <img
                            className={styles.img}
                            src="/assets/logo3.png"
                            alt=""
                        />
                    </Link>
                </div>

                {/*Menu mobile*/}
                <div className={styles.menuMobile}>
                    <NavMobile />
                </div>

                {/* Menú de login, registro y Avatar */}
                <div className={styles.header__auth}>
                    {state.isLoged || state.loged ?(
                        <Avatar />
                    ) : (
                        <>
                            <Link to="/register" className={styles.header__buttons}>Crear cuenta</Link>
                            <Link to="/login" className={styles.header__buttons}>Iniciar sesión</Link>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
