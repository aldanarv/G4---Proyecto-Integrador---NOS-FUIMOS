import React from "react";
import { Link } from "react-router-dom";
import { useMediaQuery } from 'react-responsive';
import MobileAdministration from "./MobileAdministration";

const Administration = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

  return (
    <div className="bg-[#01A9D6]">
      {isMobile ? (
        <MobileAdministration />
      ) : (
        /* Renderiza el contenido cuando la pantalla sea mayor que 640px */
        <aside className="flex flex-col w-80 h-screen py-[4.7rem] bg-[#F2FCFF]">
          <nav className="flex flex-col gap-6">
            <Link
              to="/administracion"
            >
              <h2 className="text-[#01A9D6] bg-[#BFEBFA] font-bold text-center pb-5 pt-6 w-80">PANEL DE ADMINISTRACIÓN</h2>
            </Link>
            <div className="px-8 flex flex-col gap-3">
              <h3 className="text-xl text-[#01A9D6]">
                Productos
              </h3>

              <Link
                to="/administracion/addProduct"
                className="flex items-center gap-1"
              >
                <svg className="icon icon-tabler icon-tabler-plus" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.75" stroke="#01a9d6" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 5l0 14" /><path d="M5 12l14 0" /></svg>
                <span className="text-lg font-light text-[#6B5F5F] hover:text-gray-900">Agregar producto</span>
              </Link>

              <Link
                to="/administracion"
                className="flex items-center gap-1"
              >
                <svg className="icon icon-tabler icon-tabler-list" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.75" stroke="#01a9d6" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M9 6l11 0" /><path d="M9 12l11 0" /><path d="M9 18l11 0" /><path d="M5 6l0 .01" /><path d="M5 12l0 .01" /><path d="M5 18l0 .01" /></svg>
                <span className="text-lg font-light text-[#6B5F5F] hover:text-gray-900">Lista de productos</span>
              </Link>
            </div>
            <div className="px-8 flex flex-col gap-3">
              <h3 className="text-xl text-[#01A9D6]">
                Características
              </h3>

              <Link
                to="/administracion/characteristic/addCharacteristic"
                className="flex items-center gap-1"
              >
                <svg className="icon icon-tabler icon-tabler-plus" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.75" stroke="#01a9d6" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 5l0 14" /><path d="M5 12l14 0" /></svg>
                <span className="text-lg font-light text-[#6B5F5F] hover:text-gray-900">Agregar Característica</span>
              </Link>

              <Link
                to="/administracion/characteristic"
                className="flex items-center gap-1"
              >
                <svg className="icon icon-tabler icon-tabler-list" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.75" stroke="#01a9d6" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M9 6l11 0" /><path d="M9 12l11 0" /><path d="M9 18l11 0" /><path d="M5 6l0 .01" /><path d="M5 12l0 .01" /><path d="M5 18l0 .01" /></svg>
                <span className="text-lg font-light text-[#6B5F5F] hover:text-gray-900">Lista de Características</span>
              </Link>

            </div>
            <div className="px-8 flex flex-col gap-3">
              <h3 className="text-xl text-[#01A9D6]">
                Categorías
              </h3>

              <Link
                to="/administracion/category/addCategory"
                className="flex items-center gap-1"
              >
                <svg className="icon icon-tabler icon-tabler-plus" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.75" stroke="#01a9d6" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 5l0 14" /><path d="M5 12l14 0" /></svg>
                <span className="text-lg font-light text-[#6B5F5F] hover:text-gray-900">Agregar categoría</span>
              </Link>

              <Link
                to="/administracion/category"
                className="flex items-center gap-1"
              >
                <svg className="icon icon-tabler icon-tabler-list" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.75" stroke="#01a9d6" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M9 6l11 0" /><path d="M9 12l11 0" /><path d="M9 18l11 0" /><path d="M5 6l0 .01" /><path d="M5 12l0 .01" /><path d="M5 18l0 .01" /></svg>
                <span className="text-lg font-light text-[#6B5F5F] hover:text-gray-900">Lista de categorías</span>
              </Link>
            </div>
            <div className="px-8 flex flex-col gap-3">
              <h3 className="text-xl text-[#01A9D6]">
                Usuarios
              </h3>
              <Link
                to="/administracion/users"
                className="flex items-center gap-1"
              >
                <svg className="icon icon-tabler icon-tabler-list" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.75" stroke="#01a9d6" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M9 6l11 0" /><path d="M9 12l11 0" /><path d="M9 18l11 0" /><path d="M5 6l0 .01" /><path d="M5 12l0 .01" /><path d="M5 18l0 .01" /></svg>
                <span className="text-lg font-light text-[#6B5F5F] hover:text-gray-900">Lista de usuarios</span>
              </Link>

            </div>
          </nav>
        </aside>
      )}
    </div>
  );
};

export default Administration;
