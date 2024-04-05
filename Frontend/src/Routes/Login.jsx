import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { useFormik } from "formik";
import * as Yup from "yup";
import { useFetchPostLogin } from "../PeticionesHTTP/Usuarios/useFetchPostLogin";
import { useContextGlobal } from "../Context/global.context";
import styles from "../styles/login.module.css";

const Login = () => {
    const { fetchDataUsers } = useFetchPostLogin("http://localhost:8080/usuario/iniciar-sesion");
    const { state } = useContextGlobal();

    //Mostrar contraseña
    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email("Debe ser un correo electrónico válido")
                .lowercase()
                .trim()
                .required("El correo electrónico es requerido"),
            password: Yup.string()
                .trim()
                .required("La contraseña es requerida"),
        }),
        onSubmit: (data, { resetForm }) => {
            console.log("Submitted Data:", data);

            let user = {
                email: data.email,
                password: data.password,
            };

            console.log("Users:", user);

            fetchDataUsers(user);
            resetForm();
        },
        validateOnChange: false
    });
    return (
        <article className={styles.container_login}>
            <div className={styles.login_title}>
                <h2 className={styles.login_subtitle}>Iniciar sesión</h2>
                {state.loginMsj &&
                    <div className="mb-10">
                        <p className={styles.needLogin}>
                            Para poder realizar su reserva es necesario estar logueado.
                        </p>
                        <p className={styles.needLogin}>
                            ¿Aún no estás registrado?
                            <Link to="/register" className={styles.needLogin_enlace}>Registrarme</Link>
                        </p>
                    </div>
                }
            </div>
            <div className={styles.containerForm}>
                <form className={styles.input_form} onSubmit={formik.handleSubmit}>
                    <div>
                        <label htmlFor="email" className={styles.input_label}>
                            Correo electrónico
                        </label>
                        <div className={styles.div}>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="Correo electrónico"
                                required
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.email}
                                className={styles.input}
                            />
                        </div>
                        {formik.touched.email && formik.errors.email ? (
                            <div className="text-red-500 font-light text-sm">
                                {formik.errors.email}
                            </div>
                        ) : null}
                    </div>

                    <div>
                        <div className={styles.div_password}>
                            <label htmlFor="password" className={styles.input_label}>
                                Contraseña
                            </label>
                        </div>
                        <div className={styles.div}>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                id="password"
                                placeholder="Contraseña"
                                required
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.password}
                                className={styles.input}
                            />
                            <svg onClick={togglePasswordVisibility} className="icon icon-tabler icon-tabler-eye absolute top-1 right-1.5" width="30" height="30" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" /><path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" /></svg>
                        </div>
                        {formik.touched.password && formik.errors.password ? (
                            <div className="text-red-500 font-light text-sm">
                                {formik.errors.password}
                            </div>
                        ) : null}
                    </div>

                    <div className={styles.divButton}>
                        <button type="submit" className={styles.button}>
                            Iniciar sesión
                        </button>
                    </div>

                    {!state.loginMsj &&
                        <p className={styles.needLogin}>
                            ¿Aún no estás registrado?
                            <Link to="/register" className={styles.needLogin_enlace}>Registrarme</Link>
                        </p>
                    }
                </form>
            </div>
        </article>
    );
};

export default Login;
