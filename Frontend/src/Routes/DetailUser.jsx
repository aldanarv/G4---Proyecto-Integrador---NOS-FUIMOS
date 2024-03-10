import React, { useState, useEffect } from 'react';
import { useFormik } from "formik";
import * as Yup from "yup";
import { useFetchGetIdUser } from "../PeticionesHTTP/Usuarios/useFetchGetIdUser";
import styles from "../styles/login.module.css";

const DetailUser = () => {
    const id = localStorage.getItem("id");
    const { user } = useFetchGetIdUser("http://localhost:8080/usuario/" + id);

    //Mostrar contraseña
    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const formik = useFormik({
        initialValues: {
            id: user?.id,
            nombre: user?.nombre,
            apellido: user?.apellido,
            email:user?.email,
            password: user?.password,
        },
        validationSchema: Yup.object({
            id: Yup.string().trim().required("Requerido"),
            nombre: Yup.string().min(4, "El nombre debe tener al menos 4 caracteres.").lowercase().trim().required("El nombre es requerido"),
            apellido: Yup.string().min(4, "El apellido debe tener al menos 4 caracteres.").lowercase().trim().required("El apellido es requerido"),
            email: Yup.string().email("Debe ser un correo electrónico válido").lowercase().trim().required("El correo electrónico es requerido"),
            /*
            password: Yup.string()
                .matches(/[A-Z]/, "Debe contener al menos una letra mayúscula.")
                .matches(/[0-9]/, "Debe contener al menos un número.")
                .matches(/[!@#$%^&*(),.?":{}|<>]/, "Debe contener al menos un carácter especial.")
                .min(4, "La contraseña debe tener al menos 4 caracteres.")
                .trim()
                .required("La contraseña es requerida"),
            */
        }),
        onSubmit: (data) => {
            console.log("Submitted Data:", data);

            let avatar = {
                id: data.id,
                nombre: data.nombre,
                apellido: data.apellido,
                email: data.email,
                password: data.password,
            };

            console.log("Users:", avatar);
        },
    });

    useEffect(() => {
        if (user) {
            formik.setFieldValue('id', user?.id);
            formik.setFieldValue('nombre', user?.nombre);
            formik.setFieldValue('apellido', user?.apellido);
            formik.setFieldValue('email', user?.email);
            formik.setFieldValue('password', user?.password);
        }
    }, [user]);

    return (
        <article className={styles.container_login}>
            <div className={styles.login_title}>
                <h2 className={styles.login_subtitle}>Información personal</h2>
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
                                <div className="text-black font-light text-sm">
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
                                <div className="text-black font-light text-sm">
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
                            <div className="text-black font-light text-sm">
                                {formik.errors.email}
                            </div>
                        ) : null}
                    </div>

                    {/*
                <div className={styles.divButton}>
                    <button type="submit" className={styles.button} >Actualizar datos</button>
                </div>
                */}
                </form>
            </div>
        </article>
    )
}

export default DetailUser