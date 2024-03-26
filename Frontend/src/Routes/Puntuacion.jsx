import React from 'react';
import { Link, useParams } from "react-router-dom";
import { useFetchGetID } from "../PeticionesHTTP/Productos/useFetchGetID";
import Card from "../Components/Card";

const Puntuacion = () => {
    const { id } = useParams();
    const { data } = useFetchGetID("http://localhost:8080/admin/productos/" + id);
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
                        <div className='flex items-center gap-1 mb-2'>
                            <img className='h-8' src="../../public/assets/circleCheck.png" alt="" />
                            <p className="flex items-center font-medium text-black text-lg sm:text-xl">Tu reserva ha sido realizada con éxito.</p>
                        </div>
                        <section className="max-w-4xl p-6 mx-auto bg-white rounded-lg">
                            <form>
                                <p className="text-base sm:text-lg font-bold text-black mb-1">¡Nos encantaría conocer tu calificación!</p>
                                <div className="flex items-center">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="#E47F07" stroke="#E47F07" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-star"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" /></svg>
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="#E47F07" stroke="#E47F07" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-star"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" /></svg>
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="#E47F07" stroke="#E47F07" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-star"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" /></svg>
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="#E47F07" stroke="#E47F07" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-star"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" /></svg>
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#E47F07" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-star"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" /></svg>
                                </div>
                                <div className='mt-4'>
                                    <label className="text-base font-normal text-black" htmlFor="username">¿Deseás dejarnos una reseña? (Opcional)</label>
                                    <textarea id="username" name="textarea" rows="10" cols="50" className="h-full w-full mt-1 border border-gray-300 bg-white rounded-md focus:ring-1 focus:ring-[#E47F07] focus:border-0 p-1 text-gray-900 outline-none text-base"></textarea>
                                </div>

                                <button
                                    type="submit"
                                    className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-[#E47F07] px-8 py-3 text-base font-medium text-white hover:bg-white hover:text-[#E47F07] hover:border hover:border-[#E47F07] focus:outline-none"
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

export default Puntuacion