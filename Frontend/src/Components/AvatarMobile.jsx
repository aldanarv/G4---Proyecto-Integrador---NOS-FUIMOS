import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useContextGlobal } from "../Context/global.context";
import { useFetchGetIdUser } from "../PeticionesHTTP/Usuarios/useFetchGetIdUser";
import Swal from "sweetalert2";

const AvatarMobile = () => {
    const { state, dispatch } = useContextGlobal();
    const id = localStorage.getItem("id");
    const { user } = useFetchGetIdUser("http://localhost:8080/usuario/" + id);
    const navigate = useNavigate();

    // Verificar si state.avatar y state.avatar.name existen antes de dividir el nombre
    const firstName = user?.nombre ? user.nombre.split(' ')[0] : '';
    const lastName = user?.apellido ? user.apellido.split(' ')[0] : '';

    // Obtener la primera letra del nombre y del apellido
    const firstLetterFirstName = firstName ? firstName.charAt(0) : '';
    const firstLetterLastName = lastName ? lastName.charAt(0) : '';

    //Mostrar menu desplegable
    const [isDropdownOpenMobile, setDropdownOpenMobile] = useState(false);
    const toggleDropdown = () => {
        setDropdownOpenMobile(!isDropdownOpenMobile);
    };

    // Agregar un evento al documento para cerrar el menú cuando se hace clic fuera de él
    useEffect(() => {
        const handleOutsideClickMobile = (event) => {
            const dropdownButtonMobile = document.getElementById("dropdownHoverButtonMobile");
            if (dropdownButtonMobile && !dropdownButtonMobile.contains(event.target)) {
                setDropdownOpenMobile(false);
            }
        };
        // Agregar el escuchador de eventos al documento
        document.addEventListener("click", handleOutsideClickMobile);
        // Limpiar el escuchador de eventos cuando el componente se desmonta
        return () => {
            document.removeEventListener("click", handleOutsideClickMobile);
        };
    }, []);

    const handleLogoutMobile = () => {
        // Mostrar alerta de confirmación antes de cerrar sesión
        Swal.fire({
            title: "¿Deseas cerrar sesión?",
            icon: "question",
            showCancelButton: true,
            color: "#000000",
            confirmButtonColor: "#ED9707",
            cancelButtonColor: "#01A9D6",
            confirmButtonText: "Confirmar",
            cancelButtonText: "Cancelar",
        }).then((result) => {
            if (result.isConfirmed) {
                // Limpiar el estado global
                dispatch({ type: "LOGOUT" });
                navigate('/login');
            }
        });
    };

    return (
        <>
            <div className="relative">
                <div className="flex">
                    <div className="flex items-center flex-row gap-4">
                        <div className="flex items-center justify-center w-10 h-10  bg-[#005B8D] rounded-full shrink-0">
                            <span className="font-light text-base text-white ">{firstLetterFirstName + firstLetterLastName}</span>
                        </div>
                    </div>
                    <button
                        onClick={toggleDropdown}
                        id="dropdownHoverButtonMobile"
                        data-dropdown-toggle="dropdownHover"
                        data-dropdown-trigger="click"
                        className="focus:outline-none flex flex-row items-center"
                        type="button"
                    >
                        <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" fill="none" viewBox="0 0 10 6">
                            <path stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="m1 1 4 4 4-4" />
                        </svg>
                    </button>

                </div>

                <div id="dropdownHover" className={`z-10 ${isDropdownOpenMobile ? 'absolute' : 'hidden'} right-0 bg-white rounded-lg shadow-md w-60`}>
                    <ul className="" aria-labelledby="dropdownHover">
                        <li>
                            <Link to="/detailUser" className="px-4 py-2 text-base font-light text-black hover:bg-gray-100 rounded-lg flex items-center justify-between">
                                Información personal
                                <svg className="icon icon-tabler icon-tabler-user" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" /><path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" /></svg>
                            </Link>
                        </li>
                        <li>
                            <Link to="/history" className="px-4 py-2 text-base font-light text-black hover:bg-gray-100 rounded-lg flex items-center justify-between">
                                Historial Reservas
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-bookmark"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M18 7v14l-6 -4l-6 4v-14a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4z" /></svg>
                            </Link>
                        </li>
                        <li>
                            <Link to="/favorites" className="px-4 py-2 text-base font-light text-black hover:bg-gray-100 rounded-lg flex items-center justify-between">
                                Favoritos
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="icon icon-tabler icons-tabler-outline icon-tabler-heart" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" /></svg>
                            </Link>
                        </li>
                        {state.loged ?
                            <li>
                                <Link to="/administracion" className="px-4 py-2 text-base font-light text-black hover:bg-gray-100 rounded-lg flex items-center justify-between">
                                    Panel de administración
                                    <svg className="icon icon-tabler icon-tabler-layout-dashboard" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 4h6v8h-6z" /><path d="M4 16h6v4h-6z" /><path d="M14 12h6v8h-6z" /><path d="M14 4h6v4h-6z" /></svg>
                                </Link>
                            </li> : ""
                        }
                        <li>
                            <div onClick={handleLogoutMobile} className="px-4 py-2 text-base font-light text-black hover:bg-gray-100 rounded-lg flex items-center justify-between">
                                Cerrar sesión
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-logout"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" /><path d="M9 12h12l-3 -3" /><path d="M18 15l3 -3" /></svg>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
};

export default AvatarMobile;
