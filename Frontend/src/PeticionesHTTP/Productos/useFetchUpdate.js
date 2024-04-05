import { useState } from "react";
import axios from "axios";
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

export function useFetchUpdate(url) {
    const [producto, setProducto] = useState(null);
    const navigate = useNavigate()

    const fetchDataProducto = async (product) => {
        try {
            console.log("Fetching data:", product);
            const response = await axios.put(url, product);
            console.log("Server response:", response);
            setProducto(response.data);
            if (response.status === 200) {
                Swal.fire({
                    title: "Actualizado!",
                    text: "Su producto ha sido actualizado exitosamente.",
                    icon: "success",
                    color: "#000000",
                    confirmButtonColor: "#ED9707",
                });
                navigate('/administracion');
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            Swal.fire({
                title: "Error al actualizar el producto!",
                text: "Error: " + error,
                icon: "error",
                color: "#000000",
                confirmButtonColor: "#ED9707",
            });
        }
    };

    return { fetchDataProducto };
}