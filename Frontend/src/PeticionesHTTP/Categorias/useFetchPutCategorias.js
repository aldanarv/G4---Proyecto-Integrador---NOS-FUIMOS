import { useState } from "react";
import axios from "axios";
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

export function useFetchPutCategorias(url) {
    const [categoria, setCategoria] = useState(null);
    const navigate = useNavigate()

    const fetchDataCategoria = async (category) => {
        try {
            console.log("Fetching data:", category);
            const response = await axios.put(url, category);
            console.log("Server response:", response);
            setCategoria(response.data);
            if (response.status === 200) {
                Swal.fire({
                    title: "Actualizado!",
                    text: "Su categoria ha sida actualizada exitosamente.",
                    icon: "success",
                    color: "#000000",
                    confirmButtonColor: "#ED9707",
                });
                navigate('/administracion/category');
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            Swal.fire({
                title: "Error al actualizar la categoria!",
                text: "Error: " + error,
                icon: "error",
                color: "#000000",
                confirmButtonColor: "#ED9707",
            });
        }
    };

    return { fetchDataCategoria };
}