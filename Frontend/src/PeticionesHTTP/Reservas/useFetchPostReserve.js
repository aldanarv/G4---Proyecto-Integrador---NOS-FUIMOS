import axios from "axios";
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

export function useFetchPostReserve(url) {
    const navigate = useNavigate()

    const fetchPostReserve = async (reserve) => {
        try {
            const response = await axios.post(url, reserve);
            if (response.status == 200) {
                navigate('/ConfirmReserva');
            }
            return response;
        } catch (error) {
            console.error('Error fetching data:', error);
            Swal.fire({
                title: "¡Ups! Ha ocurrido un error",
                text: error.response.data,
                icon: "error",
                color: "#000000",
                confirmButtonColor: "#ED9707",
            });
            throw error;
        }
    };

    return { fetchPostReserve };
}