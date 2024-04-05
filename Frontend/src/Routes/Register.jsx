import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useFormik } from "formik";
import * as Yup from "yup";
import { useFetchPostRegister } from "../PeticionesHTTP/Usuarios/useFetchPostRegister";
import styles from "../styles/login.module.css";

const Register = () => {
    const { fetchDataUsers } = useFetchPostRegister("http://localhost:8080/usuario/registrarse");

    //Mostrar contraseña
    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const formik = useFormik({
        initialValues: {
            nombre: "",
            apellido: "",
            email: "",
            password: "",
        },
        validationSchema: Yup.object({
            nombre: Yup.string().min(4, "El nombre debe tener al menos 4 caracteres.").lowercase().trim().matches(/^[a-zA-ZñÑáéíóúÁÉÍÓÚ]+(?: [a-zA-ZñÑáéíóúÁÉÍÓÚ]+)*$/, "El nombre no puede contener números").required("El nombre es requerido"),
            apellido: Yup.string().min(4, "El apellido debe tener al menos 4 caracteres.").lowercase().trim().matches(/^[a-zA-ZñÑáéíóúÁÉÍÓÚ]+(?: [a-zA-ZñÑáéíóúÁÉÍÓÚ]+)*$/, "El apellido no puede contener números").required("El apellido es requerido"),
            email: Yup.string().email("Debe ser un correo electrónico válido").lowercase().trim().required("El correo electrónico es requerido"),
            password: Yup.string()
                .matches(/[A-Z]/, "Debe contener al menos una letra mayúscula. [A-Z]")
                .matches(/[0-9]/, "Debe contener al menos un número. [0-9]")
                .matches(/[!@#$%^&*(),.?":{}|<>]/, "Debe contener al menos un carácter especial. [!@#$%^&*(),.?:{}|<>]")
                .min(4, "La contraseña debe tener al menos 4 caracteres.")
                .trim()
                .required("La contraseña es requerida"),
        }),
        onSubmit: (data, { resetForm }) => {
            console.log("Submitted Data:", data);

            let user = {
                nombre: data.nombre,
                apellido: data.apellido,
                email: data.email,
                password: data.password,
            };

            fetchDataUsers(user);
            resetForm();
        },
        validateOnChange: false
    });

    return (
        <article className={styles.container_login}>
            <div className={styles.login_title}>
                <h2 className={styles.login_subtitle}>Crear cuenta</h2>
            </div>
            <div className={styles.containerForm}>
                <form className={styles.input_form} onSubmit={formik.handleSubmit}>
                    <div className={styles.divLastname}>
                        <div>
                            <label htmlFor="nombre" className={styles.input_label}>Nombres</label>
                            <div className={styles.div}>
                                <input
                                    type="text"
                                    name="nombre"
                                    id="nombre"
                                    placeholder='Nombres'
                                    required
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.nombre}
                                    className={styles.input}
                                />
                            </div>
                            {formik.touched.nombre && formik.errors.nombre ? (
                                <div className="text-red-500 font-light text-sm">
                                    {formik.errors.nombre}
                                </div>
                            ) : null}
                        </div>
                        <div>
                            <label htmlFor="apellido" className={styles.input_label}>Apellidos</label>
                            <div className={styles.div}>
                                <input
                                    type="text"
                                    name="apellido"
                                    id="apellido"
                                    placeholder='Apellidos'
                                    required
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.apellido}
                                    className={styles.input}
                                />
                            </div>
                            {formik.touched.apellido && formik.errors.apellido ? (
                                <div className="text-red-500 font-light text-sm">
                                    {formik.errors.apellido}
                                </div>
                            ) : null}
                        </div>
                    </div>

                    <div>
                        <label htmlFor="email" className={styles.input_label}>Correo electrónico</label>
                        <div className={styles.div}>
                            <input
                                type="email"
                                name="email"
                                id="email"
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
                            <label htmlFor="password" className={styles.input_label}>Contraseña</label>
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
                        <button type="submit" className={styles.button} >Crear cuenta</button>
                    </div>

                    <p className={styles.needLogin}>
                        ¿Ya tienes una cuenta?
                        <Link to="/login" className={styles.needLogin_enlace}>Iniciar sesión</Link>
                    </p>
                </form>
            </div>
        </article>
    )
}

export default Register