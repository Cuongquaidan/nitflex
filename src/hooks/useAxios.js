import axios from "axios";
import { useEffect, useState } from "react";

export default function useAxios(url, keyword) {
    const [data, setData] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(url);
                if (keyword) {
                    setData(response?.data?.data?.items);
                } else {
                    setData(response?.data?.items);
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [url, keyword]);
    return data;
}
