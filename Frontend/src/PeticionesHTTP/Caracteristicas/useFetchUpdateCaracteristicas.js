import axios from "axios";
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

export function useFetchUpdateCaracteristicas(url) {
    const navigate = useNavigate()

    const fetchDataCaracteristica = async (characteristic) => {
        try {
            console.log("Fetching data:", characteristic);
            const response = await axios.put(url, characteristic);
            console.log("Server response:", response);
            if (response.status === 200) {
                Swal.fire({
                    title: "Actualizado!",
                    text: "Su caracteristica ha sido actualizada exitosamente.",
                    icon: "success",
                    color: "#000000",
                    confirmButtonColor: "#ED9707",
                });
                navigate('/administracion/characteristic');
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            Swal.fire({
                title: "Error al actualizar la caracteristica!",
                text: "Error: " + error,
                icon: "error",
                color: "#000000",
                confirmButtonColor: "#ED9707",
            });
        }
    };

    return { fetchDataCaracteristica };
}