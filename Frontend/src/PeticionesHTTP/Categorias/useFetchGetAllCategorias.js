import { useState, useEffect } from "react";
import axios from "axios";

export function useFetchGetAllCategorias(url) {
    const [categoria, setCategoria] = useState(null);

    useEffect(() => {
        axios
            .get(url)
            .then((res) => setCategoria(res.data))
            .catch((err) => console.log(err));
    }, []);

    return { categoria };
}