import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from 'sweetalert2';

export function useFetchPostReviews(url) {
    const [review, setReview] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate()

    const fetchDataReview = async (dataReview) => {
        try {
            const response = await axios.post(url, dataReview);
            if (response.status === 200) {
                Swal.fire({
                    title: "Creada!",
                    text: "Su reseña ha sido creada exitosamente.",
                    icon: "success",
                    color: "#000000",
                    confirmButtonColor: "#ED9707",
                }).then((result) => {
                    if (result.isConfirmed) {
                        navigate("/product/" + id);
                    }
                });
            }
            setReview(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return { fetchDataReview };
}