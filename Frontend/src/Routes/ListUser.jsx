import React from "react";
import { useState, useEffect } from 'react';
import axios from "axios";
import Swal from "sweetalert2";
import { useContextGlobal } from "../Context/global.context";
import { useMediaQuery } from "react-responsive";
import { useFetchGetAll } from "../PeticionesHTTP/Usuarios/useFetchGetAll";
import MobileAdministration from "../Components/MobileAdministration";
import Administration from "../Components/Administration";
import styles from "../styles/listProduct.module.css";

const ListUser = () => {
    const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
    const { state, dispatch } = useContextGlobal();
    const [userData, setUserData] = useState(null);
    const [idNames, setIdNames] = useState({});

    useEffect(() => {
        // Aquí defines los nombres descriptivos para cada ID
        if (userData) {
            const updatedIdNames = {};
            userData.forEach((user, index) => {
                updatedIdNames[user.id] = `USER-${index + 1}`;
            });
            setIdNames(updatedIdNames);
        }
    }, [userData]);


    const handleUserRoleChange = (userId) => {
        setUserData((prevData) => {
            return prevData.map((user) => {
                if (user.id === userId) {
                    return { ...user, privilegios: !user.privilegios };
                } else {
                    return user;
                }
            });
        });
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await useFetchGetAll("http://localhost:8080/usuario/listar");
                setUserData(result.data);
            } catch (error) {
                console.error("Error al obtener los datos:", error);
            }
        };

        fetchData();
    }, []);


    const handleSaveChanges = (userId) => {
        // Obtener el usuario actual
        const currentUser = userData.find((user) => user.id === userId);

        // Construir el objeto con las propiedades requeridas
        const updatedUser = {
            nombre: currentUser.nombre,
            email: currentUser.email,
            privilegios: currentUser.privilegios,
        };

        axios
            .put("http://localhost:8080/usuario/actualizar", updatedUser)
            .then(() => {
                // Actualizar el estado local con la nueva información del usuario
                dispatch({ type: "DATA_USER", payload: updatedUser });
                Swal.fire({
                    title: "¡Cambios guardados!",
                    icon: "success",
                    color: "#000000",
                    confirmButtonColor: "#ED9707",
                }).then(() => {
                    // Recargar la página después de guardar los cambios
                    window.location.reload();
                });
            })
            .catch((error) => {
                console.error("Error updating user:", error);
                Swal.fire({
                    title: "Error al guardar cambios",
                    icon: "error",
                    color: "#000000",
                    confirmButtonColor: "#ED9707",
                });
            });
    };

    return (
        <>
            {isMobile ? (
                <MobileAdministration />
            ) : (
                /* Renderiza el contenido cuando la pantalla sea mayor que 640px */
                <div className="flex">
                    <Administration />
                    <article className={styles.articleList}>
                        <section>
                            <h2 className="text-4xl font-bold text-white mb-12">
                                Usuarios registrados
                            </h2>
                            <div className="overflow-x-scroll">
                                <div className="inline-block min-w-full">
                                    <div className="overflow-hidden rounded-2xl">
                                        <table className="min-w-full border-0">
                                            <thead className="bg-[#F4CE9F]">
                                                <tr>
                                                    <th
                                                        scope="col"
                                                        className="px-4 py-4 text-base font-medium text-left text-[#E37B00]"
                                                    >
                                                        Id
                                                    </th>

                                                    <th
                                                        scope="col"
                                                        className="px-4 py-4 text-base font-medium text-left text-[#E37B00]"
                                                    >
                                                        Nombres
                                                    </th>

                                                    <th
                                                        scope="col"
                                                        className="px-4 py-4 text-base font-medium text-left text-[#E37B00]"
                                                    >
                                                        Apellidos
                                                    </th>

                                                    <th
                                                        scope="col"
                                                        className="px-4 py-4 text-base font-medium text-left text-[#E37B00]"
                                                    >
                                                        Email
                                                    </th>

                                                    <th
                                                        scope="col"
                                                        className="px-4 py-4 text-base font-medium text-left text-[#E37B00]"
                                                    >
                                                        Rol
                                                    </th>

                                                    <th
                                                        scope="col"
                                                        className="px-4 py-4 text-base font-medium text-left text-[#E37B00]"
                                                    >
                                                        Permisos
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-[#c5c5c5]">
                                                {userData?.map((user) => (
                                                    <tr key={user.id}>
                                                        <td className="px-4 py-4 text-base font-light text-black">
                                                            {idNames[user.id]}
                                                        </td>
                                                        <td className="px-4 py-4 text-base font-light text-black">
                                                            {user.nombre}
                                                        </td>
                                                        <td className="px-4 py-4 text-base font-light text-black">
                                                            {user.apellido}
                                                        </td>
                                                        <td className="px-4 py-4 text-base font-light text-black">
                                                            {user.email}
                                                        </td>
                                                        <td className="px-4 py-4 text-base font-light text-black">
                                                            {user.privilegios ? "admin" : "user"}
                                                            {user.privilegios === true && (
                                                                <span className="ml-2 text-red-600">*</span>
                                                            )}
                                                        </td>
                                                        <td className="px-4 py-8 text-center">
                                                            <div className="flex items-center gap-4">
                                                                <label className="flex items-center gap-2">
                                                                    <input
                                                                        type="checkbox"
                                                                        checked={user.privilegios}
                                                                        onChange={() => handleUserRoleChange(user.id)}
                                                                    />
                                                                    <p>administrador</p>
                                                                </label>
                                                                <button
                                                                    onClick={() => handleSaveChanges(user.id)}
                                                                    className="rounded-lg bg-[#57BEE1] shadow-md px-2 py-2 text-base font-medium text-white shadow-gray-300 hover:shadow-lg hover:bg-[#F4CE9F]"
                                                                >
                                                                    Guardar
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </article>
                </div>
            )}
        </>
    );
};

export default ListUser;
