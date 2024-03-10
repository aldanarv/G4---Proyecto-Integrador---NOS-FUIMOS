import React from 'react'
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <main className="grid h-screen place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="text-lg font-semibold text-[#01A9D6]">404</p>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-black sm:text-5xl">Página no encontrada</h1>
        <p className="mt-6 text-base leading-7 text-gray-600">Lo sentimos, no pudimos encontrar la página que estás buscando.</p>
        <div className="mt-10 flex items-center justify-center">
          <Link to={"/"} className="rounded-lg bg-[#01A9D6] shadow-sm px-6 py-2 text-base font-semibold text-white shadow-gray-300 hover:shadow-md hover:bg-[#57BEE1]">Regresar al home</Link>
        </div>
      </div>
    </main>

  )
}

export default NotFound