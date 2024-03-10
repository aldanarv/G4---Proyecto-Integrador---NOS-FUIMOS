import axios from "axios";
import Swal from 'sweetalert2';

export function useFetchPostRegister(url) {
    const fetchDataUsers = async (user) => {
        try {
            const response = await axios.post(url, user);
            if (response.status === 200 && response.data) {

                Swal.fire({
                    title: "Registro exitoso",
                    icon: "success",
                    color: "#000000",
                    confirmButtonColor: "#E47F07",
                });
            }
        } catch (error) {
            if (error.response.status === 409) {
                console.log("Error: " + error.response.data);
                Swal.fire({
                    title: "Error ya existe un usuario registrado con estos datos!",
                    icon: "error",
                    color: "#000000",
                    confirmButtonColor: "#E47F07",
                });
            } else if (error.response.status !== 200) {
                console.log("Error: " + error.response.data);
                Swal.fire({
                    title: "Lo sentimos, algo salió mal. Por favor, inténtalo de nuevo más tarde.",
                    icon: "error",
                    color: "#000000",
                    confirmButtonColor: "#E47F07",
                });
            }
            else {
                console.error('Error fetching data:', error);
            }
        }
    };

    return { fetchDataUsers };
}