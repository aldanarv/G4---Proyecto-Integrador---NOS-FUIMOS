import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom'
import { useContextGlobal } from "../Context/global.context";
import Swal from "sweetalert2";

const ProtectedRoutesBooking = () => {
    const { state, dispatch } = useContextGlobal();

    useEffect(() => {
        if (!state.isLoged && !state.loged) {
            Swal.fire({
                title: "Lo sentimos, no puedes acceder a esta sección hasta que inicies sesión.",
                icon: "warning",
                confirmButtonColor: "#ED9707",
                confirmButtonText: "Ok",
            })
            dispatch({ type: "LOGIN_MENSAJE" });
        }
    }, [state.isLoged, state.loged]);

    return (
        state.isLoged || state.loged ? <Outlet /> : <Navigate to="/login" />
    );
}

export default ProtectedRoutesBooking