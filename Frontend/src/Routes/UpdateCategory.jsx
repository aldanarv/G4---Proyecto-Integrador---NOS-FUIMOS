import React, { useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import { useFetchPutCategorias } from "../PeticionesHTTP/Categorias/useFetchPutCategorias";
import { useFetchGetID } from "../PeticionesHTTP/Productos/useFetchGetID";
import MobileAdministration from "../Components/MobileAdministration";
import { useParams } from "react-router-dom";
import Administration from "../Components/Administration";

const UpdateCategory = () => {

    const { id } = useParams();
    const { data } = useFetchGetID("http://localhost:8080/categorias/" + id);
    const { fetchDataCategoria } = useFetchPutCategorias("http://localhost:8080/categorias/actualizar");

    const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

    const convertFileToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result.split(",")[1]);
            reader.onerror = (error) => reject(error);
        });
    };

    const handleFileChange = async () => {
        const fileInput = document.getElementById("imagen").files;

        const imagen = await Promise.all(
            Array.from(fileInput).map(async (file, index) => {
                const base64String = await convertFileToBase64(file);
                return {
                    index,
                    data: base64String,
                };
            })
        );

        console.log("Processed Images:", imagen);

        formik.setFieldValue("imagen", [
            ...formik.values.imagen,
            ...imagen.map((img) => img.data),
        ]);
        formik.setFieldValue("selectedImageIndex", 0);
    };

    const handleImageRemove = async (index) => {
        const confirmRemove = await Swal.fire({
            title: "¿Seguro que quieres eliminar este icono?",
            icon: "warning",
            color: "#000000",
            showCancelButton: true,
            confirmButtonColor: "#ED9707",
            cancelButtonColor: "#01A9D6",
            confirmButtonText: "Confirmar",
            cancelButtonText: "Cancelar",
        });

        if (confirmRemove.isConfirmed) {
            const updatedImages = formik.values.imagen.filter(
                (_, i) => i !== index
            );
            formik.setFieldValue("imagen", updatedImages);
            formik.setFieldValue("selectedImageIndex", 0);
        }
    };

    const formik = useFormik({
        initialValues: {
            id: data?.id || "",
            titulo: data?.titulo || "",
            descripcion: data?.descripcion || "",
            imagen: data?.imagen || [],
        },
        validationSchema: Yup.object({
            id: Yup.string().trim().required("Requerido"),
            titulo: Yup.string().lowercase().trim().required("El nombre es requerido"),
            descripcion: Yup.string().lowercase().trim().required("La descripcion es requerida"),
            imagen: Yup.array()
                .length(1, "Solo puedes agregar 1 icono")
                .required("El icono es requerido"),
        }),
        onSubmit: (data, { resetForm }) => {
            console.log("Submitted Data:", data);

            let category = {
                id: data.id,
                titulo: data.titulo,
                descripcion: data.descripcion,
                imagen: data.imagen[0],
            };

            console.log("category:", category);

            fetchDataCategoria(category);
            resetForm();
        },
        validateOnChange: false
    });

    useEffect(() => {
        if (data) {
            formik.setFieldValue("id", data?.id);
            formik.setFieldValue("titulo", data?.titulo);
            formik.setFieldValue("descripcion", data?.descripcion);
            formik.setFieldValue("imagen", [data?.imagen]);
        }
    }, [data]);

    return (
        <>
            {isMobile ? (
                <MobileAdministration />
            ) : (
                <div className="flex">
                    <Administration />
                    <form
                        onSubmit={formik.handleSubmit}
                        id="crearCaracteristicaForm"
                        className="flex flex-col gap-3 justify-start h-screen w-full bg-[#01A9D6] overflow-x-scroll py-12 px-6 border-l-[0.5px] border-[#00000054] lg:px-12"
                    >
                        <div className="pt-16">
                            <h2 className="text-4xl font-bold text-white">Editar Categoría</h2>
                            <p className="text-lg text-white font-medium mt-2">
                                Complete el formulario para actualizar su categoría
                            </p>
                        </div>

                        <div className="bg-white rounded-lg p-10 flex justify-center items-center">
                            <div className="flex flex-col gap-6">
                                <div className="col-span-full">
                                    <label
                                        htmlFor="titulo"
                                        className="text-base font-medium text-[#ED9707]"
                                    >
                                        titulo
                                    </label>
                                    <div className="mt-2">
                                        <div className="flex rounded-md ring-1 ring-gray-300 focus-within:ring-[#ED9707] max-w-md">
                                            <input
                                                type="text"
                                                name="titulo"
                                                id="titulo"
                                                required
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.titulo}
                                                className="flex-1 border-0 bg-transparent rounded-md focus:bg-[#F4CE9F] py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 outline-none text-base"
                                            />
                                        </div>
                                        {formik.touched.titulo && formik.errors.titulo ? (
                                            <div className="text-red-400 font-light text-sm">
                                                {formik.errors.titulo}
                                            </div>
                                        ) : null}
                                    </div>
                                </div>

                                <div className="col-span-full">
                                    <label
                                        htmlFor="descripcion"
                                        className="text-base font-medium text-[#ED9707]"
                                    >
                                        descripcion
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

                                <div className="flex flex-col items-center justify-between gap-6">
                                    <div className="w-full">
                                        <p className="text-base font-medium text-[#ED9707]">Icono</p>
                                        <div className="mt-2 flex justify-center flex-col items-center gap-4 rounded-lg border border-dashed border-gray-300 px-6 py-8 hover:border-[#ED9707]">
                                            <div className="flex text-base text-gray-600">
                                                <label
                                                    htmlFor="imagen"
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
                                                    <span>Agregar Icono</span>
                                                    <input
                                                        id="imagen"
                                                        name="imagen"
                                                        type="file"
                                                        className="sr-only"
                                                        multiple
                                                        onChange={handleFileChange}
                                                        onBlur={formik.handleBlur}
                                                    />
                                                </label>
                                            </div>
                                            <p className="text-sm text-[#6B5F5F]">
                                                Debe agregar un icono
                                            </p>
                                            <p className="text-xs text-[#6B5F5F]">
                                                PNG, JPG, GIF hasta 10MB
                                            </p>
                                            <div className="flex mt-2 flex-wrap gap-1">
                                                {formik.values.imagen &&
                                                    formik.values.imagen.map((url, index) => (
                                                        <div
                                                            key={index}
                                                            className="w-16 h-16"
                                                            onClick={() =>
                                                                formik.setFieldValue("selectedImageIndex", index)
                                                            }
                                                            onDoubleClick={() => handleImageRemove(index)}
                                                        >
                                                            <img
                                                                src={"data:image;base64," + url}
                                                                className={`w-full h-full object-cover rounded-md ${index === formik.values.selectedImageIndex
                                                                    ? "border-2 border-[#ED9707]"
                                                                    : ""
                                                                    }`}
                                                            />
                                                        </div>
                                                    ))}
                                            </div>
                                            <p className="text-sm text-[#01A9D6]">
                                                Haz doble clic sobre el icono que desees cambiar
                                            </p>
                                        </div>
                                        {formik.touched.imagen && formik.errors.imagen ? (
                                            <div className="text-red-400 font-light text-sm">
                                                {formik.errors.imagen}
                                            </div>
                                        ) : null}
                                    </div>
                                    <button
                                        type="submit"
                                        className="rounded-lg bg-[#57BEE1] shadow-md px-6 py-2 text-base font-semibold text-white shadow-gray-300 hover:shadow-lg hover:bg-[#F4CE9F]"
                                    >
                                        Editar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            )}
        </>
    );
}

export default UpdateCategory;