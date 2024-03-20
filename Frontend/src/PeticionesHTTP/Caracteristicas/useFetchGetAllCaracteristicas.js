import { useState, useEffect } from "react";
import axios from "axios";

export function useFetchGetAllCaracteristicas(url) {
    const [data, setData] = useState(null);

    useEffect(() => {
        axios
            .get(url)
            .then((res) => setData(res.data))
            .catch((err) => console.log(err));
    }, []);

    return { data };
}