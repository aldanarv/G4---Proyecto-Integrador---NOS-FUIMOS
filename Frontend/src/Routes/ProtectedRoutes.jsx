import { Navigate, Outlet } from 'react-router-dom'
import { useContextGlobal } from "../Context/global.context";

const ProtectedRoutes = () => {
    const { state } = useContextGlobal();

    return (
        state.loged ? <Outlet /> : <Navigate to="/" />
    )
}

export default ProtectedRoutes
