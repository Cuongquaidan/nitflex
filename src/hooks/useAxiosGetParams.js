import axios from "axios";
import { useEffect, useState } from "react";

export default function useAxiosGetParams(url, keyword) {
    const [data, setData] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(url);
                if (keyword) {
                    setData(response.data.data);
                } else {
                    setData(response.data);
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [url, keyword]);
    return data;
}
