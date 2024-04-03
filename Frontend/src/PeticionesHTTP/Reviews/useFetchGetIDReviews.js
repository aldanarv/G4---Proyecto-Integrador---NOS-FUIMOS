import { useState, useEffect } from "react";
import axios from "axios";

export function useFetchGetIDReviews(url) {
    const [reviewId, setReviewId] = useState(null);

    useEffect(() => {
        axios
            .get(url)
            .then((res) => setReviewId(res.data))
            .catch((err) => console.log(err));
    }, []);

    return { reviewId };
}

