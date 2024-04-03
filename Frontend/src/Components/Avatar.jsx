import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useContextGlobal } from "../Context/global.context";
import { useFetchGetIdUser } from "../PeticionesHTTP/Usuarios/useFetchGetIdUser";
import Swal from "sweetalert2";

const Avatar = () => {
    const { state, dispatch } = useContextGlobal();
    const id = localStorage.getItem("id");
    const { user } = useFetchGetIdUser("http://localhost:8080/usuario/" + id);
    const navigate = useNavigate()

    // Verificar si state.avatar y state.avatar.name existen antes de dividir el nombre
    const firstName = user?.nombre ? user.nombre.split(' ')[0] : '';
    const lastName = user?.apellido ? user.apellido.split(' ')[0] : '';

    // Obtener la primera letra del nombre y del apellido
    const firstLetterFirstName = firstName ? firstName.charAt(0) : '';
    const firstLetterLastName = lastName ? lastName.charAt(0) : '';

    //Mostrar menu desplegable
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    };

    // Agregar un evento al documento para cerrar el menú cuando se hace clic fuera de él
    useEffect(() => {
        const handleOutsideClick = (event) => {
            const dropdownButton = document.getElementById("dropdownHoverButton");
            if (dropdownButton && !dropdownButton.contains(event.target)) {
                setDropdownOpen(false);
            }
        };
        // Agregar el escuchador de eventos al documento
        document.addEventListener("click", handleOutsideClick);
        // Limpiar el escuchador de eventos cuando el componente se desmonta
        return () => {
            document.removeEventListener("click", handleOutsideClick);
        };
    }, []);

    const handleLogout = () => {
        // Mostrar alerta de confirmación antes de cerrar sesión
        Swal.fire({
            title: "¿Deseas cerrar sesión?",
            icon: "question",
            showCancelButton: true,
            color: "#000000",
            confirmButtonColor: "#E47F07",
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
                        <div className="flex items-center justify-center w-10 h-10  bg-[#01A9D6] rounded-full shrink-0">
                            <span className="font-light text-base text-white ">{firstLetterFirstName + firstLetterLastName}</span>
                        </div>
                        <div className="flex flex-col items-start gap-0">
                            <h1 className="text-base font-medium text-black">{firstName} {lastName}</h1>
                            <button type="button" onClick={handleLogout} className="text-sm font-extralight text-gray-700">Cerrar sesión</button>
                        </div>
                    </div>
                    <button
                        onClick={toggleDropdown}
                        id="dropdownHoverButton"
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

                <div id="dropdownHover" className={`z-10 ${isDropdownOpen ? 'absolute' : 'hidden'} right-0 bg-white rounded-lg shadow-md w-60`}>
                    <ul className="" aria-labelledby="dropdownHover">
                        <li>
                            <Link to="/detailUser" className="px-4 py-2 text-base font-light text-black hover:bg-gray-100 rounded-lg flex items-center justify-between">
                                Información personal
                                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z"/></svg>
                                </Link>
                                </li>
                            <li>
                                                    <Link to="/history" className="px-4 py-2 text-base font-light text-black hover:bg-gray-100 rounded-lg flex items-center justify-between">
                                                        Historial
                                                        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M480-40 192-256q-15-11-23.5-28t-8.5-36v-480q0-33 23.5-56.5T240-880h480q33 0 56.5 23.5T800-800v480q0 19-8.5 36T768-256L480-40Zm0-100 240-180v-480H240v480l240 180Zm-42-220 226-226-56-58-170 170-84-84-58 56 142 142Zm42-440H240h480-240Z"/></svg>
                                                </Link>
                                                </li>

                        <li>
                            <Link to="/favorites" className="px-4 py-2 text-base font-light text-black hover:bg-gray-100 rounded-lg flex items-center justify-between">
                                Favoritos
                                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Zm0-108q96-86 158-147.5t98-107q36-45.5 50-81t14-70.5q0-60-40-100t-100-40q-47 0-87 26.5T518-680h-76q-15-41-55-67.5T300-774q-60 0-100 40t-40 100q0 35 14 70.5t50 81q36 45.5 98 107T480-228Zm0-273Z"/></svg>
                                </Link>
                                </li>
                        {state.loged ?
                            <li>
                                <Link to="/administracion" className="px-4 py-2 text-base font-light text-black hover:bg-gray-100 rounded-lg flex items-center justify-between">
                                    Panel de Administración
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M520-600v-240h320v240H520ZM120-440v-400h320v400H120Zm400 320v-400h320v400H520Zm-400 0v-240h320v240H120Zm80-400h160v-240H200v240Zm400 320h160v-240H600v240Zm0-480h160v-80H600v80ZM200-200h160v-80H200v80Zm160-320Zm240-160Zm0 240ZM360-280Z"/></svg>
                                    </Link>
                            </li> : ""
                        }
                    </ul>
                </div>
            </div>
        </>
    );
};

export default Avatar;
