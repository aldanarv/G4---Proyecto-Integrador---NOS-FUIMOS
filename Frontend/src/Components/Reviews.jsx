import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useFetchGetID } from "../PeticionesHTTP/Productos/useFetchGetID";
import AvatarReview from './AvatarReview';
import axios from "axios";
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const Reviews = () => {
    const navigate = useNavigate()

    const { id } = useParams();
    const { data } = useFetchGetID("http://localhost:8080/admin/productos/" + id);
    const [reviewsData, setReviewsData] = useState([]);

    const idUser = localStorage.getItem("id");
    const [hasFinishedReservation, setHasFinishedReservation] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            if (data?.listResena) {
                // Mapear sobre la lista de reseñas y realizar las solicitudes de forma paralela
                const reviews = await Promise.all(data.listResena.map(async (idReview) => {
                    try {
                        const response = await axios.get("http://localhost:8080/resena/" + idReview);
                        return response.data;
                    } catch (error) {
                        console.error("Error fetching review:", error);
                        return null;
                    }
                }));
                setReviewsData(reviews);
            }
        };
        fetchData();
    }, [data]);

    // Función para renderizar las estrellas según la puntuación
    const renderStars = (rating) => {
        const stars = [];
        for (let i = 0; i < 5; i++) {
            if (i < rating) {
                stars.push(<svg key={i} width="20" height="20" viewBox="0 0 24 24" fill="#E47F07" stroke="#E47F07" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-star"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" /></svg>);
            } else {
                stars.push(<svg key={i} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#E47F07" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-star"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" /></svg>);
            }
        }
        return stars;
    };

    const checkReservation = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/reserva/buscar/usuario-id/${idUser}`);
            const reservations = response.data;
            const hasFinished = reservations.some(reservation => reservation.productoId === id && reservation.usuarioId === idUser);
            setHasFinishedReservation(hasFinished);
            if (!hasFinished) {
                Swal.fire({
                    title: "Oops...",
                    text: "Para dejar una reseña, es necesario haber reservado este producto previamente.",
                    icon: "error",
                    color: "#000000",
                    confirmButtonColor: "#ED9707",
                });
            } else {
                navigate(`/product/${id}/addPuntuacion`);
            }
        } catch (error) {
            console.error("Error fetching reservations:", error);
        }
    };

    return (
        <section className="text-gray-600 body-font">
            <div className="">
                <div className='flex flex-col md:flex-row mb-6 mt-10 justify-between'>
                    <h1 className="text-2xl sm:text-3xl font-medium title-font text-black text-center mb-3 md:mb-0">Calificaciones y reseñas</h1>
                    <button onClick={checkReservation}>
                        <div className="h-full bg-gray-100 py-3 px-6 rounded-xl shadow-xl">
                            <div className='flex sm:justify-between gap-0 md:gap-6'>
                                <div className="inline-flex items-center gap-4">
                                    <AvatarReview />
                                    <div>
                                        <p className="title-font font-medium text-black text-base">Escribir reseña</p>
                                        <div className="items-center flex sm:hidden">
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#E47F07" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-star"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" /></svg>
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#E47F07" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-star"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" /></svg>
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#E47F07" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-star"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" /></svg>
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#E47F07" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-star"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" /></svg>
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#E47F07" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-star"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" /></svg>
                                        </div>
                                    </div>
                                </div>
                                <div className="items-center hidden sm:flex">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#E47F07" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-star"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" /></svg>
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#E47F07" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-star"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" /></svg>
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#E47F07" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-star"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" /></svg>
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#E47F07" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-star"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" /></svg>
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#E47F07" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-star"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" /></svg>
                                </div>
                            </div>
                        </div>
                    </button>
                </div>
                {reviewsData?.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7">
                        {reviewsData?.map((review, index) => (
                            <div key={index} className="w-full col-span-1">
                                <div className="h-full bg-gray-100 p-4 sm:p-8 rounded-xl shadow-xl">
                                    <svg fill="currentColor" className="block w-5 h-5 text-gray-400 mb-4" viewBox="0 0 975.036 975.036">
                                        <path d="M925.036 57.197h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.399 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l36 76c11.6 24.399 40.3 35.1 65.1 24.399 66.2-28.6 122.101-64.8 167.7-108.8 55.601-53.7 93.7-114.3 114.3-181.9 20.601-67.6 30.9-159.8 30.9-276.8v-239c0-27.599-22.401-50-50-50zM106.036 913.497c65.4-28.5 121-64.699 166.9-108.6 56.1-53.7 94.4-114.1 115-181.2 20.6-67.1 30.899-159.6 30.899-277.5v-239c0-27.6-22.399-50-50-50h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.4 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l35.9 75.8c11.601 24.399 40.501 35.2 65.301 24.399z"></path>
                                    </svg>
                                    <p className="leading-relaxed mb-6 text-base">{review?.comentario}</p>
                                    <div className='flex flex-col-reverse sm:flex-row justify-between'>
                                        <div className="flex items-start flex-col ">
                                            <div className='flex items-center'>
                                                <div className="flex items-center justify-center w-12 h-12  bg-[#005B8D] rounded-full shrink-0">
                                                    <span className="font-light text-lg text-white ">{review?.usuarioNombre ? review.usuarioNombre.split(' ')[0].charAt(0) : ''}{review?.usuarioApellido ? review.usuarioApellido.split(' ')[0].charAt(0) : ''}</span>
                                                </div>
                                                <span className="flex-grow flex flex-col pl-4">
                                                    <span className="title-font font-medium text-black">{review?.usuarioNombre ? review.usuarioNombre.split(' ')[0] : ''} {review?.usuarioApellido ? review.usuarioApellido.split(' ')[0] : ''}</span>
                                                    <span className="text-gray-500 text-sm font-light">{review?.fecha}</span>
                                                    <div className="items-center flex sm:hidden">
                                                        {renderStars(review?.puntuacion)}
                                                    </div>
                                                </span>
                                            </div>
                                        </div>
                                        <div className="items-center hidden sm:flex">
                                            {renderStars(review?.puntuacion)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    )
}

export default Reviews