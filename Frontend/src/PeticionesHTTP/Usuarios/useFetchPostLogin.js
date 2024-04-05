import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { useContextGlobal } from "../../Context/global.context";

export function useFetchPostLogin(url) {
    const { dispatch } = useContextGlobal();
    const navigate = useNavigate();

    const fetchDataUsers = async (user) => {
        try {
            const response = await axios.post(url, user);

            if (response.status === 200 && response.data) {

                localStorage.setItem("id", response.data.id);

                if (response.data.privilegios) {
                    dispatch({ type: 'ADMIN_LOGED' });
                } else {
                    dispatch({ type: 'USER_LOGED' });
                }

                Swal.fire({
                    title: `Bienvenido(a)! ${response.data.nombre}`,
                    icon: "success",
                    color: "#000000",
                    confirmButtonColor: "#ED9707",
                });
                navigate('/detailUser');
            }
        } catch (error) {
            if (error.response.status === 401) {
                console.log("Error: " + error.response.data);
                Swal.fire({
                    title: "contraseña incorrecta",
                    icon: "error",
                    color: "#000000",
                    confirmButtonColor: "#ED9707",
                });
            } else if (error.response.status == 404) {
                console.log("Error: " + error.response.data);
                Swal.fire({
                    title: "Usuario no encontrado",
                    icon: "error",
                    color: "#000000",
                    confirmButtonColor: "#ED9707",
                });
            } else if (error.response) {
                console.log("Error: " + error.response.data);
                Swal.fire({
                    title: "Lo sentimos, algo salió mal. Por favor, inténtalo de nuevo más tarde.",
                    icon: "error",
                    color: "#000000",
                    confirmButtonColor: "#ED9707",
                });
            }
            else {
                console.error('Error fetching data:', error);
            }
        }
    };

    return { fetchDataUsers };
}
