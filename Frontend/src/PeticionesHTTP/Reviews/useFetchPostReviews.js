import { useState } from "react";
import axios from "axios";
import Swal from 'sweetalert2';

export function useFetchPostReviews(url) {
    const [review, setReview] = useState(null);

    const fetchDataReview = async (dataReview) => {
        try {
            const response = await axios.post(url, dataReview);
            setReview(response.data);
            Swal.fire({
                title: "Creada!",
                text: "Su reseña ha sido creada exitosamente.",
                icon: "success",
                color: "#000000",
                confirmButtonColor: "#E47F07",
            });
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return { fetchDataReview };
}