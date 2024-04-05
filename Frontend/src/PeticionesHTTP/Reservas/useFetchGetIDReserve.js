import { useState, useEffect } from "react";
import axios from "axios";

export function useFetchGetIDReserve(url) {
    const [reviews, setReviews] = useState(null);

    useEffect(() => {
        axios
            .get(url)
            .then((res) => setReviews(res.data))
            .catch((err) => console.log(err));
    }, []);

    return { reviews };
}