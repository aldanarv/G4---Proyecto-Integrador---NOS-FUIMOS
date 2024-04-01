import { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom'
import { useContextGlobal } from "../Context/global.context";
import Swal from "sweetalert2";

const ProtectedRoutesBooking = () => {
    const { state } = useContextGlobal();

    useEffect(() => {
        if (!state.isLoged && !state.loged) {
            Swal.fire({
                title: "Lo sentimos, no puedes acceder a esta sección hasta que inicies sesión.",
                icon: "warning",
                confirmButtonColor: "#E47F07",
                confirmButtonText: "Ok",
            })
        }
    }, [state.isLoged, state.loged]);

    return (
        state.isLoged || state.loged ? <Outlet /> : <Navigate to="/login" />
    );
}

export default ProtectedRoutesBooking