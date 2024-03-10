import React from 'react';
import { Link, useParams } from "react-router-dom";
import { useFetchGetID } from "../PeticionesHTTP/Productos/useFetchGetID";
import Card from "../Components/Card";

const Reservar = () => {
    const { id } = useParams();
    const { data } = useFetchGetID("http://localhost:8080/admin/productos/" + id);
    return (
        <section className="body-font overflow-hidden bg-[#FFE9CE]">
            <div className="container px-5 py-24 lg:py-40 mx-auto">
                <div className="lg:w-11/12 mx-auto flex flex-col lg:flex-row items-center justify-center gap-8">
                    <div className="lg:w-1/2 w-full sm:flex sm:flex-col sm:items-center sm:justify-center">
                        {data ? (
                            <Card
                                className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
                                key={data.id}
                                id={data.id}
                                nombre={data.nombre}
                                destino={data.destino}
                                salidaDate={data.salidaDate}
                                vueltaDate={data.vueltaDate}
                                precio={data.precio}
                                urlImagenes={data.urlImagenes}
                            />
                        ) : (
                            <p>Cargando...</p>
                        )}
                    </div>
                    <div className="lg:w-1/2 w-full">
                        <h2 className="text-[#E47F07] text-3xl md:text-4xl font-bold mb-1">¡Reservá tu lugar!</h2>
                        <p className="flex items-center font-medium text-[#E37B00] mb-4 text-base">Completá el formulario y nos pondremos en contacto contigo.</p>
                        <section className="max-w-4xl p-6 mx-auto bg-white rounded-lg">
                            <form>
                                <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                                    <div>
                                        <label className="text-base font-medium text-[#E47F07]" htmlFor="username">Nombre</label>
                                        <input
                                            type="text"
                                            name="username"
                                            id="username"
                                            className="block w-full border border-gray-300 bg-white rounded-md focus:bg-[#F4CE9F] py-1 pl-1 text-gray-900 outline-none text-base"
                                        />
                                    </div>

                                    <div>
                                        <label className="text-base font-medium text-[#E47F07]" htmlFor="lastname">Apellido</label>
                                        <input
                                            type="text"
                                            name="lastname"
                                            id="lastname"
                                            className="block w-full border border-gray-300 bg-white rounded-md focus:bg-[#F4CE9F] py-1 pl-1 text-gray-900 outline-none text-base"
                                        />
                                    </div>

                                    <div>
                                        <label className="text-base font-medium text-[#E47F07]" htmlFor="email">Email</label>
                                        <input
                                            type="text"
                                            name="email"
                                            id="email"
                                            className="block w-full border border-gray-300 bg-white rounded-md focus:bg-[#F4CE9F] py-1 pl-1 text-gray-900 outline-none text-base"
                                        />
                                    </div>

                                    <div>
                                        <label className="text-base font-medium text-[#E47F07]" htmlFor="telefono">Teléfono</label>
                                        <input
                                            type="text"
                                            name="telefono"
                                            id="telefono"
                                            className="block w-full border border-gray-300 bg-white rounded-md focus:bg-[#F4CE9F] py-1 pl-1 text-gray-900 outline-none text-base"
                                        />
                                    </div>
                                </div>

                                <div className="flex justify-between mt-6">
                                    <Link to={"/product/" + id}>
                                        <button
                                            type="submit"
                                            className="flex rounded-xl bg-[#ECECEC] shadow-md px-6 py-1 text-base font-light text-black shadow-gray-300 hover:shadow-lg hover:bg-[#F4CE9F]"
                                        >
                                            <svg className="icon icon-tabler icon-tabler-arrow-left" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#6B5F5F" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M5 12l14 0" /><path d="M5 12l6 6" /><path d="M5 12l6 -6" /></svg>
                                            Atrás
                                        </button>
                                    </Link>
                                    <button
                                        type="submit"
                                        className="rounded-xl bg-[#57BEE1] shadow-md px-8 py-1 text-base font-semibold text-white shadow-gray-300 hover:shadow-lg hover:bg-[#F4CE9F]"
                                    >
                                        Enviar
                                    </button>
                                </div>
                            </form>
                        </section>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Reservar