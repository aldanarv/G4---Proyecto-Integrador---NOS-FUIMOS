import { useState, useEffect } from "react";
import axios from "axios";

export function useFetchGetIdUser(url) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        axios
            .get(url)
            .then((res) => setUser(res.data))
            .catch((err) => console.log(err));
    }, []);

    return { user };
}