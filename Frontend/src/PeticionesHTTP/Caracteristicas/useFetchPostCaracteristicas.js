import { useState } from "react";
import axios from "axios";
import Swal from 'sweetalert2';

export function useFetchPostCaracteristicas(url) {
    const [data, setData] = useState(null);

    const fetchData = async (product) => {
        try {
            const response = await axios.post(url, product);
            setData(response.data);
            Swal.fire({
                title: "Creada!",
                text: "Su caracteristica ha sido creada exitosamente.",
                icon: "success",
                color: "#000000",
                confirmButtonColor: "#E47F07",
            });
        } catch (error) {
            if (error.response.status === 409) {
                console.log("Error: " + error.response.data);
                Swal.fire({
                    title: "Error ya existe una caracteristica con ese nombre!",
                    text: error.response.data,
                    icon: "error",
                    color: "#000000",
                    confirmButtonColor: "#E47F07",
                });
            } else {
                console.error('Error fetching data:', error);
            }
        }
    };

    return { fetchData };
}