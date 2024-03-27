import { Navigate, Outlet } from 'react-router-dom'
import { useContextGlobal } from "../Context/global.context";

const ProtectedRoutesBooking = () => {
    const { state } = useContextGlobal();

    return (
        state.isLoged || state.loged ? <Outlet /> : <Navigate to="/" />
    )
}

export default ProtectedRoutesBooking