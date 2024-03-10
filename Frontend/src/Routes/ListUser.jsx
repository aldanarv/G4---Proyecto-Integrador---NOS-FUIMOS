import React from "react";
import { useState } from 'react';
import axios from "axios";
import Swal from "sweetalert2";
import { useContextGlobal } from "../Context/global.context";
import { useMediaQuery } from "react-responsive";
import { useFetchGetAll } from "../PeticionesHTTP/Productos/useFetchGetAll";
import MobileAdministration from "../Components/MobileAdministration";
import Administration from "../Components/Administration";
import styles from "../styles/listProduct.module.css";

const ListUser = () => {
    const isMobile = useMediaQuery({ query: "(max-width: 1024px)" });
    const { state, dispatch } = useContextGlobal();
    const { data } = useFetchGetAll("http://localhost:8080/usuario/listar");

    // Manejar el estado de los roles de los usuarios
    const [userRoles, setUserRoles] = useState(
        data ? data.reduce((roles, user) => {
            roles[user.id] = user.privilegios === true ? true : false;
            return roles;
        }, {}) : {}
    );

    const handleUserRoleChange = (userId) => {
        setUserRoles((prevRoles) => {
            // Si el usuario tiene el rol "admin", establecerlo como falso
            if (prevRoles[userId] === undefined && userRoles[userId] === true) {
                return {
                    ...prevRoles,
                    [userId]: false,
                };
            }
            // En caso contrario, invertir el valor del rol
            return {
                ...prevRoles,
                [userId]: !prevRoles[userId],
            };
        });
    };

    const handleSaveChanges = (userId) => {
        // Obtener el usuario actual
        const currentUser = data.find((user) => user.id === userId);

        // Construir el objeto con las propiedades requeridas
        const updatedUser = {
            nombre: currentUser.nombre,
            email: currentUser.email,
            privilegios: userRoles[userId] ? true : false,
        };

        axios
            .put("http://localhost:8080/usuario/actualizar", updatedUser)
            .then(() => {
                // Actualizar el estado local con la nueva información del usuario
                dispatch({ type: "DATA_USER", payload: updatedUser });
                Swal.fire("¡Cambios guardados!", "", "success");
            })
            .catch((error) => {
                console.error("Error updating user:", error);
                Swal.fire("Error al guardar cambios", "", "error");
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
                                                {data?.map((user) => (
                                                    <tr key={user.id}>
                                                        <td className="px-4 py-4 text-base font-light text-black">
                                                            {user.id}
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
                                                                        checked={userRoles[user.id]}
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
