import axios from "axios";
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

export function useFetchPostReserve(url){
    const navigate = useNavigate()

    const fetchPostReserve = async (reserve) => {
        try {
            const response = await axios.post(url, reserve);
            Swal.fire({
                title: "¡Reserva realizada exitosamente!",
                icon: "success",
                color: "#000000",
                confirmButtonColor: "#E47F07",
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/');
                }
            });
            return response;
        } catch (error) {
            console.error('Error fetching data:', error);
            Swal.fire({
                title: "¡Ups! Ha ocurrido un error",
                text: error.response.data,
                icon: "error",
                color: "#000000",
                confirmButtonColor: "#E47F07",
            });
            throw error;
        }
    };

    return { fetchPostReserve };
}