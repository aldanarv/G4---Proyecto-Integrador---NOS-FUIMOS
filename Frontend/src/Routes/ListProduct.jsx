import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { useMediaQuery } from "react-responsive";
import { useFetchGetAll } from "../PeticionesHTTP/Productos/useFetchGetAll";
import MobileAdministration from "../Components/MobileAdministration";
import ShowImagesProduct from "../Components/ShowImagesProduct";
import Administration from "../Components/Administration";
import styles from "../styles/listProduct.module.css";

const ListProduct = () => {
    const { data } = useFetchGetAll("http://localhost:8080/admin/productos");

    const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

    const [idNames, setIdNames] = useState({}); // Utiliza useState para inicializar el estado

    useEffect(() => {
        // Aquí defines los nombres descriptivos para cada ID
        if (data) {
            const updatedIdNames = {};
            data.forEach((product, index) => {
                updatedIdNames[product.id] = `PACK-${index + 1}`;
            });
            setIdNames(updatedIdNames); // Utiliza setIdNames para actualizar el estado
        }
    }, [data, setIdNames]);

    const eliminarProducto = async (productId, productNombre) => {
        try {
            const result = await Swal.fire({
                title: "Deseas eliminar el producto?",
                text: productNombre,
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#ED9707",
                cancelButtonColor: "#01A9D6",
                color: "#000000",
                confirmButtonText: "Confirmar",
                cancelButtonText: "Cancelar",
            });

            if (result.isConfirmed) {
                const url = `http://localhost:8080/admin/productos/${productId}`;
                await axios.delete(url);
                Swal.fire({
                    title: "Eliminado!",
                    text: "Su producto ha sido eliminado exitosamente.",
                    icon: "success",
                    color: "#000000",
                    confirmButtonColor: "#ED9707",
                }).then(() => {
                    // Recargar la página después de eliminar el producto
                    window.location.reload();
                });
            }
        } catch (error) {
            console.error("Error al eliminar el producto:", error);
            // Manejar errores, si es necesario
        }
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
                                Lista de productos
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
                                                        Nombre
                                                    </th>

                                                    <th
                                                        scope="col"
                                                        className="px-4 py-4 text-base font-medium text-left text-[#E37B00]"
                                                    >
                                                        Destino
                                                    </th>

                                                    <th
                                                        scope="col"
                                                        className="px-4 py-4 text-base font-medium text-left text-[#E37B00]"
                                                    >
                                                        Descripción
                                                    </th>

                                                    <th
                                                        scope="col"
                                                        className="px-4 py-4 text-base font-medium text-left text-[#E37B00]"
                                                    >
                                                        Categoría
                                                    </th>

                                                    <th
                                                        scope="col"
                                                        className="px-4 py-4 text-base font-medium text-left text-[#E37B00]"
                                                    >
                                                        Caracteristicas
                                                    </th>

                                                    <th
                                                        scope="col"
                                                        className="px-4 py-4 text-base font-medium text-left text-[#E37B00]"
                                                    >
                                                        Fecha salida
                                                    </th>

                                                    <th
                                                        scope="col"
                                                        className="px-4 py-4 text-base font-medium text-left text-[#E37B00]"
                                                    >
                                                        Fecha regreso
                                                    </th>

                                                    <th
                                                        scope="col"
                                                        className="px-4 py-4 text-base font-medium text-left text-[#E37B00]"
                                                    >
                                                        Precio
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-4 py-4 text-base font-medium text-left text-[#E37B00]"
                                                    >
                                                        Imagenes
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
                                                {data?.map((product) => (
                                                    <tr key={product.id}>
                                                        <td className="px-4 py-4 text-base font-light text-black">
                                                            {idNames[product.id]}
                                                        </td>
                                                        <td className="px-4 py-4 text-base font-light text-black">
                                                            {product.nombre}
                                                        </td>
                                                        <td className="px-4 py-4 text-base font-light text-black truncate max-w-72">
                                                            {product.destino}
                                                        </td>
                                                        <td className="px-4 py-4 text-base font-light text-black truncate max-w-72">
                                                            {product.descripcion}
                                                        </td>
                                                        <td className="px-4 py-4 text-base font-light text-black text-center">
                                                            {product.categoria}
                                                        </td>
                                                        <td style={{ maxHeight: '150px', flexWrap: 'wrap' }} className="px-4 py-4 text-base font-light text-black flex flex-col items-center">
                                                            {product.listCaracteristicas && (
                                                                product.listCaracteristicas.map((caracteristica, index) => (
                                                                    <img key={index} style={{ height: '25px', width: '25px' }} src={"data:image;base64," + caracteristica.icono} alt="" />
                                                                ))
                                                            )}
                                                        </td>
                                                        <td className="px-4 py-4 text-base font-light text-black text-center">
                                                            {product.salidaDate}
                                                        </td>
                                                        <td className="px-4 py-4 text-base font-light text-black text-center">
                                                            {product.vueltaDate}
                                                        </td>
                                                        <td className="px-4 py-4 text-base font-light text-black text-center">
                                                            ${product.precio}
                                                        </td>
                                                        <td className="px-4 py-4">
                                                            <div className="flex flex-col items-center">
                                                                <ShowImagesProduct urlImagenes={product.urlImagenes} />
                                                            </div>
                                                        </td>
                                                        <td className="px-4 py-8 text-center">
                                                            <button
                                                                className="flex flex-col items-center"
                                                                onClick={() => eliminarProducto(product.id, product.nombre)}
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
                                                                Eliminar producto
                                                            </button>
                                                        </td>
                                                        <td className="px-4 py-8 text-center">
                                                            <Link
                                                                className="flex flex-col items-center"
                                                                to={
                                                                    "/administracion/updateProduct/" + product.id
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
                                                                Editar producto
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
};

export default ListProduct;
