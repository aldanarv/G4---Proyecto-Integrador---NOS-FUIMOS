import axios from "axios";
import Swal from 'sweetalert2';

export function useFetchPutFavorite(url) {

    const fetchPutFavorite = async (product) => {
        try {
            console.log("Fetching data:", product);
            const response = await axios.put(url);
            console.log("Server response:", response);
            return response;
        } catch (error) {
            console.error('Error fetching data:', error);
            Swal.fire({
                title: "Error al actualizar el producto!",
                text: "Error: " + error,
                icon: "error",
                color: "#000000",
                confirmButtonColor: "#ED9707",
            });
            throw error;
        }
    };

    return { fetchPutFavorite };
}