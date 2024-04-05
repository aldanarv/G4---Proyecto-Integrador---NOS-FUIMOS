import React from "react";
import { useFetchGetIDReserve } from "../PeticionesHTTP/Reservas/useFetchGetIDReserve";

const ListHistorial = () => {
    const userId = localStorage.getItem("id");
    const { reviews } = useFetchGetIDReserve(`http://localhost:8080/reserva/buscar/usuario-id/`+userId);

    return (
        <div>
            <main className="bg-[#FFE9CE] pt-32 px-6 pb-16 h-screen lg:px-16">
                <article className='h-full'>
                    <div className='pb-4'>
                        <h3 className="font-normal text-2xl sm:text-4xl text-[#C15205] capitalize">Historial de reservas</h3>
                    </div>
                    <div className='overflow-x-scroll h-full'>
                        <div className='inline-block min-w-full'>
                        <div className="overflow-hidden rounded-2xl">
                            <table className="min-w-full border-0">
                                <thead className="bg-[#F2FCFF] border-b border-[#005B8D]">

                                    <tr>
                                        <th
                                            scope="col"
                                            className="px-4 py-4 text-base font-semibold text-left text-[#005B8D]"
                                        >
                                            Fecha de reserva
                                        </th>

                                        <th
                                            scope="col"
                                            className="px-4 py-4 text-base font-semibold text-left text-[#005B8D]"
                                        >
                                            Viaje reservado
                                        </th>

                                        <th
                                            scope="col"
                                            className="px-4 py-4 text-base font-semibold text-left text-[#005B8D]"
                                        >
                                            Destino
                                        </th>

                                        <th
                                            scope="col"
                                            className="px-4 py-4 text-base font-semibold text-left text-[#005B8D]"
                                        >
                                            Fecha de ida
                                        </th>

                                        <th
                                            scope="col"
                                            className="px-4 py-4 text-base font-semibold text-left text-[#005B8D]"
                                        >
                                            Fecha de regreso
                                        </th>
                                        
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-[#c5c5c5]">
                                    {reviews?.map((review) => (
                                        <tr key={review.id}>    
                                            <td className="px-4 py-4 text-base font-light text-black">
                                                {review.fechaReserva}
                                            </td>
                                            <td className="px-4 py-4 text-base font-light text-black">
                                                {review.nombreProducto}
                                            </td>
                                            <td className="px-4 py-4 text-base font-light text-black">
                                                {review.destinoProducto}
                                            </td>
                                            <td className="px-4 py-4 text-base font-light text-black">
                                                {review.fechaIdaProducto}
                                            </td>
                                            <td className="px-4 py-4 text-base font-light text-black">
                                                {review.fechaRegresoProducto}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        </div>

                    </div>
                </article>
            </main>
        </div>
    )
}

export default ListHistorial