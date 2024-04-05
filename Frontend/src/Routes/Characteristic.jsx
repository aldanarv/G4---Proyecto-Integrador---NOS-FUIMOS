import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useMediaQuery } from "react-responsive";
import Swal from "sweetalert2";
import Administration from "../Components/Administration";
import MobileAdministration from "../Components/MobileAdministration";
import { useFetchGetAllCaracteristicas } from "../PeticionesHTTP/Caracteristicas/useFetchGetAllCaracteristicas";
import styles from "../styles/listProduct.module.css";

const Characteristic = () => {
    const { data } = useFetchGetAllCaracteristicas("http://localhost:8080/admin/caracteristica");

    const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

    const [idNames, setIdNames] = useState({});

    useEffect(() => {
        // Aquí defines los nombres descriptivos para cada ID
        if (data) {
            const updatedIdNames = {};
            data.forEach((characteristic, index) => {
                updatedIdNames[characteristic.id] = `CAR-${index + 1}`;
            });
            setIdNames(updatedIdNames);
        }
    }, [data, setIdNames]);

    const eliminarCaracteristica = async (characteristicId, characteristicNombre) => {
        try {
            const result = await Swal.fire({
                title: "Deseas eliminar la caracteristica?",
                text: characteristicNombre,
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#ED9707",
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
                    confirmButtonColor: "#ED9707",
                }).then(() => {
                    // Recargar la página después de eliminar la caracteristica
                    window.location.reload();
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
                                        Lista de Características
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
                                                        Nombre
                                                    </th>

                                                    <th
                                                        scope="col"
                                                        className="px-4 py-4 text-base font-medium text-left text-[#E37B00]"
                                                    >
                                                        Icono
                                                    </th>

                                                    <th
                                                        scope="col"
                                                        className="px-4 py-4 text-base font-medium text-left text-[#E37B00]"
                                                    >
                                                        Acciones
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-4 py-4 text-base font-medium text-left text-[#E37B00]"
                                                    >

                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-[#c5c5c5]">
                                                {data?.map((characteristic) => (
                                                    <tr key={characteristic.id}>
                                                        <td className="px-4 py-4 text-base font-light text-black">
                                                            {idNames[characteristic.id]}
                                                        </td>
                                                        <td className="px-4 py-4 text-base font-light text-black">
                                                            {characteristic.nombre}
                                                        </td>
                                                        <td className="px-4 py-4 text-base font-light text-black">
                                                            <img src={"data:image;base64," + characteristic.icono} alt="" style={{ height: '25px', width: '25px' }} />
                                                        </td>
                                                        <td className="px-4 py-8 text-center">
                                                            <button
                                                                className="flex flex-col items-center"
                                                                onClick={() => eliminarCaracteristica(characteristic.id, characteristic.nombre)}
                                                            >
                                                                <svg
                                                                    className="icon icon-tabler icon-tabler-trash"
                                                                    width="30"
                                                                    height="30"
                                                                    viewBox="0 0 24 24"
                                                                    strokeWidth="1.75"
                                                                    stroke="#000000"
                                                                    fill="none"
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                >
                                                                    <path
                                                                        stroke="none"
                                                                        d="M0 0h24v24H0z"
                                                                        fill="none"
                                                                    />
                                                                    <path d="M4 7l16 0" />
                                                                    <path d="M10 11l0 6" />
                                                                    <path d="M14 11l0 6" />
                                                                    <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                                                                    <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                                                                </svg>
                                                                Eliminar
                                                            </button>
                                                        </td>
                                                        <td className="px-4 py-8 text-center">
                                                            <Link
                                                                className="flex flex-col items-center"
                                                                to={
                                                                    "/administracion/characteristic/updateCharacteristic/" + characteristic.id
                                                                }
                                                            >
                                                                <svg
                                                                    className="icon icon-tabler icon-tabler-edit"
                                                                    width="30"
                                                                    height="30"
                                                                    viewBox="0 0 24 24"
                                                                    strokeWidth="1.75"
                                                                    stroke="currentColor"
                                                                    fill="none"
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                >
                                                                    <path
                                                                        stroke="none"
                                                                        d="M0 0h24v24H0z"
                                                                        fill="none"
                                                                    />
                                                                    <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" />
                                                                    <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" />
                                                                    <path d="M16 5l3 3" />
                                                                </svg>
                                                                Editar
                                                            </Link>
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

export default Characteristic;