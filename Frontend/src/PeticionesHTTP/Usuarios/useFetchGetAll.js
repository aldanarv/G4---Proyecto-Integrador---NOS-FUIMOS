import axios from "axios";

export function useFetchGetAll(url) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios.get(url);
            const data = response.data;
            resolve({ data });
        } catch (error) {
            reject(error);
        }
    });
}
