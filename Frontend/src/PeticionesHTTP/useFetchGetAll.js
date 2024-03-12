import { useState, useEffect } from "react";
import axios from "axios";

export function useFetchGetAll(url) {
    const [data, setData] = useState(null);

    useEffect(() => {
        axios
            .get(url)
            .then((res) => setData(res.data))
            .catch((err) => console.log(err));
    }, [data]);

    return { data };
}