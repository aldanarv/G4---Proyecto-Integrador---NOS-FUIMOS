import * as React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { useMediaQuery } from "react-responsive";
import { useFetchGetAll } from "../PeticionesHTTP/Productos/useFetchGetAll";
import MobileAdministration from "../Components/MobileAdministration";
import ShowImagesProduct from "../Components/ShowImagesProduct";
import Administration from "../Components/Administration";
import styles from "../styles/listProduct.module.css";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const ListProductCopy = () => {
    const { data } = useFetchGetAll("http://localhost:8080/admin/productos");

    const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

    const eliminarProducto = async (productId, productNombre) => {
        try {
            const result = await Swal.fire({
                title: "Deseas eliminar el producto?",
                text: productNombre,
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#E47F07",
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
                    confirmButtonColor: "#E47F07",
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
                                <TableContainer component={Paper}>
                                    <Table
                                        sx={{ minWidth: 650 }}
                                        aria-label="table with ellipsis texts"
                                    >
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Id</TableCell>
                                                <TableCell align="left">Nombre</TableCell>
                                                <TableCell align="left">Destino</TableCell>
                                                <TableCell align="left">descripcion</TableCell>
                                                <TableCell align="center">Categoría</TableCell>
                                                <TableCell align="center">Caracteristicas</TableCell>
                                                <TableCell align="center">Fecha salida</TableCell>
                                                <TableCell align="center">Fecha regreso</TableCell>
                                                <TableCell align="center">Precio</TableCell>
                                                <TableCell align="center">Imagenes</TableCell>
                                                <TableCell align="center">Acciones</TableCell>
                                                <TableCell align="center"></TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {data?.map((product) => (
                                                <TableRow
                                                    key={product.id}
                                                    sx={{
                                                        "&:last-child td, &:last-child th": { border: 0 },
                                                    }}
                                                >
                                                    <TableCell component="th" scope="row">
                                                        {product.id}
                                                    </TableCell>
                                                    <TableCell align="left">{product.nombre}</TableCell>
                                                    <TableCell
                                                        align="left"
                                                        style={{
                                                            whiteSpace: "nowrap",
                                                            textOverflow: "ellipsis",
                                                            overflow: "hidden",
                                                            maxWidth: 300,
                                                        }}
                                                    >
                                                        {product.destino}
                                                    </TableCell>
                                                    <TableCell
                                                        align="left"
                                                        style={{
                                                            whiteSpace: "nowrap",
                                                            textOverflow: "ellipsis",
                                                            overflow: "hidden",
                                                            maxWidth: 300,
                                                        }}
                                                    >
                                                        {product.descripcion}
                                                    </TableCell>
                                                    <TableCell
                                                        align="center"
                                                        style={{
                                                            whiteSpace: "nowrap",
                                                            textOverflow: "ellipsis",
                                                            overflow: "hidden",
                                                            maxWidth: 300,
                                                        }}
                                                    >
                                                        {product.categoria}
                                                    </TableCell>

                                                    <TableCell
                                                        align="center"
                                                        style={{
                                                            flexWrap: "wrap",
                                                            display: "flex",
                                                            flexDirection: "row",
                                                        }}
                                                    >
                                                        {product.listCaracteristicas &&
                                                            product.listCaracteristicas.map(
                                                                (caracteristica, index) => (
                                                                    <img
                                                                        key={index}
                                                                        style={{ height: "25px", width: "25px" }}
                                                                        src={
                                                                            "data:image;base64," +
                                                                            caracteristica.icono
                                                                        }
                                                                        alt=""
                                                                    />
                                                                )
                                                            )}
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        {product.salidaDate}
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        {product.vueltaDate}
                                                    </TableCell>
                                                    <TableCell align="center">{product.precio}</TableCell>
                                                    <TableCell align="center">
                                                        <div className="flex flex-col items-center">
                                                            <ShowImagesProduct
                                                                urlImagenes={product.urlImagenes}
                                                            />
                                                        </div>
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        <button
                                                            className="flex flex-col items-center"
                                                            onClick={() =>
                                                                eliminarProducto(product.id, product.nombre)
                                                            }
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
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        <Link
                                                            className="flex flex-col items-center"
                                                            to={"/administracion/updateProduct/" + product.id}
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
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </div>
                        </section>
                    </article>
                </div>
            )}
        </>
    );
};

export default ListProductCopy;
