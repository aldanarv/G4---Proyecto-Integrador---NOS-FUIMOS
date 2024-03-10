import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useMediaQuery } from "react-responsive";
import Swal from "sweetalert2";
import Administration from "../Components/Administration";
import MobileAdministration from "../Components/MobileAdministration";
import { useFetchGetAllCategorias } from "../PeticionesHTTP/Categorias/useFetchGetAllCategorias";
import styles from "../styles/listProduct.module.css";

const ListCategory = () => {
    const { categoria } = useFetchGetAllCategorias("http://localhost:8080/categorias/listar");

    const isMobile = useMediaQuery({ query: "(max-width: 1024px)" });

    const eliminarCategoria = async (characteristicId, characteristicNombre) => {
        try {
            const result = await Swal.fire({
                title: "Deseas eliminar la caracteristica?",
                text: characteristicNombre,
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#E47F07",
                cancelButtonColor: "#01A9D6",
                color: "#000000",
                confirmButtonText: "Confirmar",
                cancelButtonText: "Cancelar",
            });

            if (result.isConfirmed) {
                const url = `http://localhost:8080/admin/caracteristica/${characteristicId}`;
                await axios.delete(url);
                Swal.fire({
                    title: "Eliminada!",
                    text: "Su caracteristica ha sido eliminada exitosamente.",
                    icon: "success",
                    color: "#000000",
                    confirmButtonColor: "#E47F07",
                });
            }
        } catch (error) {
            console.error("Error al eliminar la característica:", error);
        }
    };

    return (
        <>
            {isMobile ? (
                <MobileAdministration />
            ) : (
                <div className="flex">
                    <Administration />
                    <article className={styles.articleList}>
                        <section>
                            <div className="overflow-x-scroll">
                                <div className="inline-block min-w-full">
                                    <h2 className="text-4xl font-bold text-white mb-12">
                                        Lista de categorías
                                    </h2>
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
                                                        titulo
                                                    </th>

                                                    <th
                                                        scope="col"
                                                        className="px-4 py-4 text-base font-medium text-left text-[#E37B00]"
                                                    >
                                                        descripcion
                                                    </th>

                                                    <th
                                                        scope="col"
                                                        className="px-4 py-4 text-base font-medium text-left text-[#E37B00]"
                                                    >
                                                        Imagen
                                                    </th>

                                                    <th
                                                        scope="col"
                                                        className="px-4 py-4 text-base font-medium text-left text-[#E37B00]"
                                                    >
                                                        idProductos
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-[#c5c5c5]">
                                                {categoria?.map((category) => (
                                                    <tr key={category.id}>
                                                        <td className="px-4 py-4 text-base font-light text-black">
                                                            {category.id}
                                                        </td>
                                                        <td className="px-4 py-4 text-base font-light text-black">
                                                            {category.titulo}
                                                        </td>
                                                        <td className="px-4 py-4 text-base font-light text-black">
                                                            {category.descripcion}
                                                        </td>
                                                        <td className="px-4 py-4 text-base font-light text-black">
                                                            <img src={"data:image;base64," + category.imagen} alt="" style={{ height: '25px', width: '25px' }} />
                                                        </td>
                                                        <td className="px-4 py-4 text-base font-light text-black">
                                                            {category.idProductos}
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
}

export default ListCategory;