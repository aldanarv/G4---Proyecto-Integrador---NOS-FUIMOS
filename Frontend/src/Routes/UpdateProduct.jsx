import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from 'sweetalert2';
import { useFetchUpdate } from "../PeticionesHTTP/Productos/useFetchUpdate";
import { useFetchGetID } from "../PeticionesHTTP/Productos/useFetchGetID";
import { useFetchGetAll } from "../PeticionesHTTP/Productos/useFetchGetAll";
import { useFetchGetAllCategorias } from "../PeticionesHTTP/Categorias/useFetchGetAllCategorias";
import Administration from "../Components/Administration";
import MobileAdministration from "../Components/MobileAdministration";

const UpdateProduct = () => {
    const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
    const { id } = useParams();
    const { data } = useFetchGetID("http://localhost:8080/admin/productos/" + id);
    const dataCaracteristica = useFetchGetAll("http://localhost:8080/admin/caracteristica").data;
    const { categoria } = useFetchGetAllCategorias("http://localhost:8080/categorias/listar");
    const { fetchDataProducto } = useFetchUpdate("http://localhost:8080/admin/productos/actualizar");


    // Función para convertir un archivo a base64
    const convertFileToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result.split(",")[1]);
            reader.onerror = (error) => reject(error);
        });
    };

    const handleFileChange = async () => {
        const fileInput = document.getElementById("urlImagenes").files;

        // Procesa cada archivo y conviértelo a base64
        const urlImagenes = await Promise.all(
            Array.from(fileInput).map(async (file, index) => {
                const base64String = await convertFileToBase64(file);
                return {
                    index,
                    data: base64String,
                };
            })
        );

        console.log("Processed Images:", urlImagenes);

        // Actualiza el estado de formik con las imágenes procesadas
        formik.setFieldValue("urlImagenes", [...formik.values.urlImagenes, ...urlImagenes.map(img => img.data)]);
        formik.setFieldValue("selectedImageIndex", 0); // Establece el índice seleccionado en el primero por defecto
    };


    const handleImageRemove = async (index) => {
        const confirmRemove = await Swal.fire({
            title: "¿Seguro que quieres eliminar esta imagen?",
            icon: "warning",
            color: "#000000",
            showCancelButton: true,
            confirmButtonColor: "#ED9707",
            cancelButtonColor: "#01A9D6",
            confirmButtonText: "Confirmar",
            cancelButtonText: "Cancelar",
        });

        if (confirmRemove.isConfirmed) {
            const updatedImages = formik.values.urlImagenes.filter((_, i) => i !== index);
            formik.setFieldValue("urlImagenes", updatedImages);
            formik.setFieldValue("selectedImageIndex", 0); // Ajusta el índice seleccionado si es necesario
        }
    };

    const agregarCaracteristica = (caracteristicaSeleccionada) => {
        if (caracteristicaSeleccionada && !formik.values.listCaracteristicas.includes(caracteristicaSeleccionada)) {
            formik.setFieldValue('listCaracteristicas', [...formik.values.listCaracteristicas, caracteristicaSeleccionada]);
        }
    };

    const eliminarCaracteristica = (caracteristica) => {
        const nuevasCaracteristicas = formik.values.listCaracteristicas.filter((c) => c !== caracteristica);
        formik.setFieldValue('listCaracteristicas', nuevasCaracteristicas);
    };

    const formik = useFormik({
        initialValues: {
            id: data?.id || "",
            nombre: data?.nombre || "",
            destino: data?.destino || "",
            descripcion: data?.descripcion || "",
            idCategoria: data?.idCategoria || "",
            categoria: data?.categoria || "",
            salidaDate: data?.salidaDate || "",
            vueltaDate: data?.vueltaDate || "",
            precio: data?.precio || "",
            urlImagenes: data?.urlImagenes || [],
            listCaracteristicas: data?.listCaracteristicas || []
        },
        validationSchema: Yup.object({
            id: Yup.string().trim().required("Requerido"),
            nombre: Yup.string().min(4, "El nombre debe tener al menos 4 caracteres.").lowercase().trim().required("El nombre es requerido"),
            destino: Yup.string().min(4, "El destino debe tener al menos 4 caracteres.").lowercase().trim().required("El destino es requerido"),
            descripcion: Yup.string().min(4, "La descripcion debe tener al menos 4 caracteres.").lowercase().trim().required("La descripcion es requerida"),
            salidaDate: Yup.date().required("La fecha de salida es requerida"),
            vueltaDate: Yup.date().min(Yup.ref('salidaDate'), 'La fecha de regreso no puede ser anterior a la fecha de salida').required("La fecha de regreso requerida"),
            precio: Yup.number().min(1).positive("El precio debe ser un número positivo").required("El precio es requerido"),
            categoria: Yup.string().lowercase().trim().required("La categoría es requerida"),
            urlImagenes: Yup.array()
                .min(5, "Debes agregar mínimo 5 imágenes")
                .required("Las imagenes son requeridas"),
            listCaracteristicas: Yup.array()
                .min(3, "Debes agregar mínimo 3 características")
                .required("Las características son requeridas"),
            selectedImageIndex: Yup.number(),
        }),
        onSubmit: (data) => {
            console.log("Submitted Data:", data);

            let caracteristicas = data.listCaracteristicas.map(caracteristica => {
                let caracteristicaGeneral = dataCaracteristica.find(element => caracteristica == element.nombre);
                if (caracteristicaGeneral) {
                    return {
                        nombre: caracteristicaGeneral.nombre,
                        icono: caracteristicaGeneral.icono
                    }
                }
            });

            caracteristicas = caracteristicas.filter(Boolean);

            let product = {
                id: data?.id,
                nombre: data.nombre,
                destino: data.destino,
                descripcion: data.descripcion,
                idCategoria: data.idCategoria,
                categoria: data.categoria,
                salidaDate: data.salidaDate,
                vueltaDate: data.vueltaDate,
                precio: data.precio,
                urlImagenes: data.urlImagenes,
                selectedImageIndex: data.selectedImageIndex,
                listCaracteristicas: caracteristicas
            };

            console.log("Product:", product);

            fetchDataProducto(product);
        },
        validateOnChange: false
    });

    useEffect(() => {
        if (data) {
            formik.setFieldValue("id", data?.id);
            formik.setFieldValue("nombre", data?.nombre);
            formik.setFieldValue("destino", data?.destino);
            formik.setFieldValue("descripcion", data?.descripcion);
            formik.setFieldValue("idCategoria", data?.idCategoria || "");
            formik.setFieldValue("categoria", data?.categoria);
            formik.setFieldValue("salidaDate", data?.salidaDate);
            formik.setFieldValue("vueltaDate", data?.vueltaDate);
            formik.setFieldValue("precio", data?.precio);
            formik.setFieldValue("urlImagenes", data?.urlImagenes);
            formik.setFieldValue(
                "listCaracteristicas",
                data?.listCaracteristicas ? data.listCaracteristicas.map(item => item.nombre) : []
            );
        }
    }, [data]);

    return (
        <>
            {isMobile ? (
                <MobileAdministration />
            ) : (
                /* Renderiza el contenido cuando la pantalla sea mayor que 640px */
                <div className="flex">
                    <Administration />
                    <form
                        onSubmit={formik.handleSubmit}
                        id="updateProductoForm"
                        encType="multipart/form-data"
                        className="flex flex-col gap-3 justify-start h-screen w-full bg-[#01A9D6] overflow-x-scroll py-12 px-6 border-l-[0.5px] border-[#00000054] lg:px-12"
                    >
                        <div className="pt-20">
                            <h2 className="text-4xl font-bold text-white">Actualizar producto</h2>
                            <p className="text-lg text-white font-medium mt-2">
                                Utilice el formulario para actualizar el producto
                            </p>
                        </div>

                        <div className="bg-white rounded-lg p-10 grid grid-cols-2 gap-6">
                            <div className="flex flex-col gap-6">
                                <div className="col-span-full">
                                    <label
                                        htmlFor="nombre"
                                        className="text-base font-medium text-[#ED9707]"
                                    >
                                        Nombre
                                    </label>
                                    <div className="mt-2">
                                        <div className="flex rounded-md ring-1 ring-gray-300 focus-within:ring-[#ED9707] max-w-md">
                                            <input
                                                type="text"
                                                name="nombre"
                                                id="nombre"
                                                required
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.nombre}
                                                className="flex-1 border-0 bg-transparent rounded-md focus:bg-[#F4CE9F] py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 outline-none text-base"
                                            />
                                        </div>
                                        {formik.touched.nombre && formik.errors.nombre ? (
                                            <div className="text-red-400 font-light text-sm">
                                                {formik.errors.nombre}
                                            </div>
                                        ) : null}
                                    </div>
                                </div>
                                <div className="col-span-full">
                                    <label
                                        htmlFor="destino"
                                        className="text-base font-medium text-[#ED9707]"
                                    >
                                        Destino
                                    </label>
                                    <div className="mt-2">
                                        <div className="flex rounded-md ring-1 ring-gray-300 focus-within:ring-[#ED9707] max-w-md">
                                            <input
                                                type="text"
                                                name="destino"
                                                id="destino"
                                                required
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.destino}
                                                className="flex-1 border-0 bg-transparent rounded-md focus:bg-[#F4CE9F] py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 outline-none text-base"
                                            />
                                        </div>
                                        {formik.touched.destino && formik.errors.destino ? (
                                            <div className="text-red-400 font-light text-sm">
                                                {formik.errors.destino}
                                            </div>
                                        ) : null}
                                    </div>
                                </div>
                                <div className="col-span-full">
                                    <label
                                        htmlFor="descripcion"
                                        className="text-base font-medium text-[#ED9707]"
                                    >
                                        Descripción
                                    </label>
                                    <div className="mt-2">
                                        <div className="flex rounded-md ring-1 ring-gray-300 focus-within:ring-[#ED9707] max-w-md">
                                            <input
                                                type="text"
                                                name="descripcion"
                                                id="descripcion"
                                                required
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.descripcion}
                                                className="flex-1 border-0 bg-transparent rounded-md focus:bg-[#F4CE9F] py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 outline-none text-base"
                                            />
                                        </div>
                                        {formik.touched.descripcion && formik.errors.descripcion ? (
                                            <div className="text-red-400 font-light text-sm">
                                                {formik.errors.descripcion}
                                            </div>
                                        ) : null}
                                    </div>
                                </div>
                                <div className="col-span-full">
                                    <label
                                        htmlFor="categoria"
                                        className="text-base font-medium text-[#ED9707]"
                                    >
                                        Categoria
                                    </label>
                                    <div className="mt-2">
                                        <div className="flex rounded-md ring-1 ring-gray-300 focus-within:ring-[#ED9707] max-w-md">
                                            <select
                                                id="categoria"
                                                name="categoria"
                                                required
                                                onChange={(e) => {
                                                    const selectedCategory = categoria.find(cat => cat.titulo === e.target.value);
                                                    formik.setFieldValue('idCategoria', selectedCategory.id);
                                                    formik.setFieldValue('categoria', selectedCategory.titulo);
                                                }}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.categoria}
                                                className="flex-1 border-0 bg-transparent rounded-md focus:bg-[#F4CE9F] py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 outline-none text-base"
                                            >
                                                {categoria && categoria.length > 0 ? (
                                                    categoria.map((category) => (
                                                        <option key={category.id} value={category.titulo}>
                                                            {category.titulo}
                                                        </option>
                                                    ))
                                                ) : (
                                                    <option value="">Cargando categorías...</option>
                                                )}
                                            </select>
                                        </div>
                                        {formik.touched.categoria && formik.errors.categoria ? (
                                            <div className="text-red-400 font-light text-sm">
                                                {formik.errors.categoria}
                                            </div>
                                        ) : null}
                                    </div>
                                </div>
                                <div className="col-span-full">
                                    <label
                                        htmlFor="salidaDate"
                                        className="text-base font-medium text-[#ED9707]"
                                    >
                                        Fecha de salida
                                    </label>
                                    <div className="mt-2">
                                        <div className="flex rounded-md ring-1 ring-gray-300 focus-within:ring-[#ED9707] max-w-md">
                                            <input
                                                type="date"
                                                name="salidaDate"
                                                id="salidaDate"
                                                required
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.salidaDate}
                                                className="flex-1 border-0 bg-transparent rounded-md focus:bg-[#F4CE9F] py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 outline-none text-base"
                                            />
                                        </div>
                                        {formik.touched.salidaDate && formik.errors.salidaDate ? (
                                            <div className="text-red-400 font-light text-sm">
                                                {formik.errors.salidaDate}
                                            </div>
                                        ) : null}
                                    </div>
                                </div>
                                <div className="col-span-full">
                                    <label
                                        htmlFor="vueltaDate"
                                        className="text-base font-medium text-[#ED9707]"
                                    >
                                        Fecha de regreso
                                    </label>
                                    <div className="mt-2">
                                        <div className="flex rounded-md ring-1 ring-gray-300 focus-within:ring-[#ED9707] max-w-md">
                                            <input
                                                type="date"
                                                name="vueltaDate"
                                                id="vueltaDate"
                                                required
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.vueltaDate}
                                                className="flex-1 border-0 bg-transparent rounded-md focus:bg-[#F4CE9F] py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 outline-none text-base"
                                            />
                                        </div>
                                        {formik.touched.vueltaDate && formik.errors.vueltaDate ? (
                                            <div className="text-red-400 font-light text-sm">
                                                {formik.errors.vueltaDate}
                                            </div>
                                        ) : null}
                                    </div>
                                </div>
                                <div className="col-span-full">
                                    <label
                                        htmlFor="precio"
                                        className="text-base font-medium text-[#ED9707]"
                                    >
                                        Precio
                                    </label>
                                    <div className="mt-2">
                                        <div className="flex rounded-md ring-1 ring-gray-300 focus-within:ring-[#ED9707] max-w-md">
                                            <input
                                                type="number"
                                                name="precio"
                                                id="precio"
                                                placeholder="$"
                                                required
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.precio}
                                                className="flex-1 border-0 bg-transparent rounded-md focus:bg-[#F4CE9F] py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 outline-none text-base"
                                            />
                                        </div>
                                        {formik.touched.precio && formik.errors.precio ? (
                                            <div className="text-red-400 font-light text-sm">
                                                {formik.errors.precio}
                                            </div>
                                        ) : null}
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col items-center justify-between gap-6">
                                <div className="w-full">
                                <p
                                        className="text-base font-medium text-[#ED9707]"
                                    >
                                        Características
                                    </p>

                                    <div className="mt-2">
                                        <div className="flex flex-wrap gap-2">
                                            {dataCaracteristica && formik.values.listCaracteristicas && dataCaracteristica.length > 0 ? (
                                                dataCaracteristica.map((caracteristica) => (
                                                    <div key={caracteristica.id} className="inline-flex items-center">
                                                        <input
                                                            id={"listCaracteristicas" + caracteristica.id}
                                                            type="checkbox"
                                                            name="listCaracteristicas"
                                                            value={caracteristica.nombre}
                                                            checked={formik.values.listCaracteristicas.includes(caracteristica.nombre)}
                                                            onChange={(e) => {
                                                                if (e.target.checked) {
                                                                    agregarCaracteristica(caracteristica.nombre);
                                                                } else {
                                                                    eliminarCaracteristica(caracteristica.nombre);
                                                                }
                                                            }}
                                                            className="form-checkbox h-5 w-5 text-[#F4CE9F] focus:ring-[#ED9707] border-gray-300 rounded-md"
                                                        />
                                                        <span className="ml-2 text-gray-900">{caracteristica.nombre}</span>
                                                    </div>
                                                ))
                                            ) : (
                                                <p>No hay datos disponibles.</p>
                                            )}
                                        </div>
                                        {formik.touched.listCaracteristicas && formik.errors.listCaracteristicas ? (
                                            <div className="text-red-400 font-light text-sm">
                                                {formik.errors.listCaracteristicas}
                                            </div>
                                        ) : null}
                                    </div>
                                </div>
                                <div className="w-full">
                                    <p
                                        className="text-base font-medium text-[#ED9707]"
                                    >
                                        Imágenes
                                    </p>
                                    <div className="mt-2 flex justify-center flex-col items-center gap-4 rounded-lg border border-dashed border-gray-300 px-6 py-12 hover:border-[#ED9707]">
                                        <div className="flex text-base text-gray-600">
                                            <label
                                                htmlFor="urlImagenes"
                                                className="rounded-md border border-solid border-gray-300 px-6 py-2 text-base font-light hover:shadow-lg cursor-pointer text-[#ED9707] hover:bg-[#ED9707] hover:text-white hover:border-white"
                                            >
                                                <svg
                                                    className="mx-auto h-12 w-12 text-gray-300"
                                                    viewBox="0 0 24 24"
                                                    fill="currentColor"
                                                    aria-hidden="true"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                                <span>
                                                    Agregar imagenes
                                                </span>
                                                <input
                                                    id="urlImagenes"
                                                    name="urlImagenes"
                                                    type="file"
                                                    className="sr-only"
                                                    multiple
                                                    onChange={handleFileChange}
                                                    onBlur={formik.handleBlur}
                                                />
                                            </label>
                                        </div>
                                        <p className="text-sm text-[#6B5F5F]">
                                            Debes agregar minimo 5 imagenes
                                        </p>
                                        <p className="text-xs text-[#6B5F5F]">
                                            PNG, JPG, GIF hasta 10MB
                                        </p>
                                        {/* Sección para mostrar las miniaturas de las imágenes */}
                                        <div className="flex mt-2 flex-wrap gap-1">
                                            {formik.values.urlImagenes && formik.values.urlImagenes.map((url, index) => (
                                                <div key={index} className="w-16 h-16" onClick={() => formik.setFieldValue("selectedImageIndex", index)} onDoubleClick={() => handleImageRemove(index)}>
                                                    <img src={"data:image;base64," + url} className={`w-full h-full object-cover rounded-md ${index === formik.values.selectedImageIndex ? 'border-2 border-[#ED9707]' : ''}`} />
                                                </div>
                                            ))}
                                        </div>
                                        <p className="text-sm text-[#01A9D6]">
                                            Haz doble clic sobre la imagen que deseas borrar
                                        </p>
                                    </div>
                                    {formik.touched.urlImagenes && formik.errors.urlImagenes ? (
                                        <div className="text-red-400 font-light text-sm">
                                            {formik.errors.urlImagenes}
                                        </div>
                                    ) : null}
                                </div>
                                <div className="flex gap-3">
                                    <Link to="/administracion" className="rounded-lg bg-[#57BEE1] shadow-md px-6 py-2 text-base font-semibold text-white shadow-gray-300 hover:shadow-lg hover:bg-[#F4CE9F]">
                                        Cancelar
                                    </Link>
                                    <button
                                        type="submit"
                                        className="rounded-lg bg-[#ED9707] shadow-md px-6 py-2 text-base font-semibold text-white shadow-gray-300 hover:shadow-lg hover:bg-[#57BEE1]"
                                    >
                                        Editar producto
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            )}
        </>
    );
};

export default UpdateProduct;
