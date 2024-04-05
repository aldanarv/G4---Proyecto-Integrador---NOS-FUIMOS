import React from 'react';
import styles from "../styles/buttonWhatsApp.module.css"

const ButtonWhatsApp = () => {
    return (
        <div>
            <a className={styles.whatsappBtn} href="https://wa.me/1234567890" target="_blank"></a>
        </div>
    );
};

export default ButtonWhatsApp;
