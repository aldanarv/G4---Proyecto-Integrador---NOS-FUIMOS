import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { format } from 'date-fns';
import { useFetchGetID } from "../PeticionesHTTP/Productos/useFetchGetID";
import { useFetchPostReviews } from "../PeticionesHTTP/Reviews/useFetchPostReviews";
import { useFetchGetIdUser } from "../PeticionesHTTP/Usuarios/useFetchGetIdUser";
import Card from "../Components/Card";
import StarRating from "../Components/ui/Buttons/StarRating";

const AddPuntuacion = () => {
    const { id } = useParams();
    const userId = localStorage.getItem("id");
    const { user } = useFetchGetIdUser("http://localhost:8080/usuario/" + userId);
    const { data } = useFetchGetID("http://localhost:8080/admin/productos/" + id);
    const { fetchDataReview } = useFetchPostReviews("http://localhost:8080/resena/" + id);

    const today = new Date();
    const formattedDate = format(today, 'dd/MM/yyyy');

    const formik = useFormik({
        initialValues: {
            usuarioId: user?.id || "",
            usuarioNombre: user?.nombre || "",
            usuarioApellido: user?.apellido || "",
            puntuacion: 0,
            fecha: formattedDate || "",
            comentario: "",
        },
        validationSchema: Yup.object({
            puntuacion: Yup.number().min(1,"Debes agregar minimo 1 estrella").required("La puntuación es requerida"),
            comentario: Yup.string().lowercase().trim(),
        }),
        onSubmit: (info, { resetForm }) => {
            console.log("Submitted Data:", info);

            let dataReview = {
                usuarioId: info.usuarioId,
                usuarioNombre: info.usuarioNombre,
                usuarioApellido: info.usuarioApellido,
                puntuacion: info.puntuacion,
                fecha: info.fecha,
                comentario: info.comentario,
            };

            console.log("review:", dataReview);

            fetchDataReview(dataReview);
            resetForm();
        },
        validateOnChange: false
    });

    useEffect(() => {
        if (data) {
            formik.setFieldValue("usuarioId", user?.id);
            formik.setFieldValue("usuarioNombre", user?.nombre);
            formik.setFieldValue("usuarioApellido", user?.apellido);
            formik.setFieldValue("fecha", formattedDate);
        }
    }, [data]);

    const handleRatingChange = (value) => {
        formik.setFieldValue("puntuacion", value);
    };

    return (
        <section className="body-font overflow-hidden bg-[#FFE9CE]">
            <div className="container px-5 py-24 lg:py-40 mx-auto">
                <Link to={"/product/" + id}>
                    <button
                        type="submit"
                        className="flex text-base font-light text-black hover:underline mb-6"
                    >
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            strokeWidth="1"
                            stroke="currentColor"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M5 12l14 0" />
                            <path d="M5 12l4 4" />
                            <path d="M5 12l4 -4" />
                        </svg>
                        Atrás
                    </button>
                </Link>
                <div className="lg:w-11/12 mx-auto flex flex-col lg:flex-row items-center justify-center gap-8">
                    <div className="lg:w-1/2 w-full sm:flex sm:flex-col sm:items-center sm:justify-center">
                        {data ? (
                            <Card
                                className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
                                key={data.id}
                                id={data.id}
                                nombre={data.nombre}
                                destino={data.destino}
                                descripcion={data.descripcion}
                                salidaDate={data.salidaDate}
                                vueltaDate={data.vueltaDate}
                                precio={data.precio}
                                urlImagenes={data.urlImagenes}
                            />
                        ) : (
                            <p>Cargando...</p>
                        )}
                    </div>
                    <div className="lg:w-1/2 w-full max-w-[472px]">
                        <section className="max-w-4xl p-6 mx-auto bg-white rounded-lg">
                            <form
                                onSubmit={formik.handleSubmit}
                                id="addReview"
                            >
                                <p className="text-base sm:text-lg font-bold text-black mb-1">¡Nos encantaría conocer tu calificación!</p>
                                <>
                                    <StarRating onChange={handleRatingChange} />
                                    {formik.touched.puntuacion && formik.errors.puntuacion ? (
                                        <div className="text-red-400 font-light text-sm">
                                            {formik.errors.puntuacion}
                                        </div>
                                    ) : null}
                                </>
                                <div className='mt-4'>
                                    <label className="text-base font-normal text-black" htmlFor="comentario">¿Deseás dejarnos una reseña? (Opcional)</label>
                                    <textarea name="comentario" id="comentario" cols="50" rows="10" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.comentario} className="h-full w-full mt-1 border border-gray-300 bg-white rounded-md focus:ring-1 focus:ring-[#E47F07] focus:border-0 p-1 text-gray-900 outline-none text-base"></textarea>
                                    {formik.touched.comentario && formik.errors.comentario ? (
                                        <div className="text-red-400 font-light text-sm">
                                            {formik.errors.comentario}
                                        </div>
                                    ) : null}
                                </div>

                                <button
                                    type="submit"
                                    className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-[#005B8D] px-8 py-3 text-base font-medium text-white hover:bg-white hover:text-[#005B8D] hover:border hover:border-[#005B8D] focus:outline-none"
                                >
                                    Enviar
                                </button>
                            </form>
                        </section>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AddPuntuacion