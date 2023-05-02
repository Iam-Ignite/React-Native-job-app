import axios from "axios";
import { useState, useEffect } from "react";
// import { RAPID_API_KEY } from '@env'

// const rapidApiKey = RAPID_API_KEY;
const useFetch = (endpoint, query) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);


    const options = {
        method: 'GET',
        url: `https://jsearch.p.rapidapi.com/${endpoint}`,
        headers: {
            'content-type': 'application/octet-stream',
            'X-RapidAPI-Key': '3542d0185bmshaa0d0a2d359e097p17af61jsn40ecf0ef20b1',
            // 'X-RapidAPI-Key': 'e09c68e4e4msh40076e794948c4cp1a4f70jsnb1094004d9c9',
            'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
        },

        params: { ...query },
    };

    const fetchData = async () => {
        setIsLoading(true);
        try {
	const response = await axios.request(options);
            setData(response.data.data);
            setError(false);
        }
        catch (error) {
            setError(error);
            console.log("hhgf");
            alert(error);
        }
        finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchData()
    }, []);

    const refetch = () => {
        setIsLoading(true)
        fetchData()
    }

    return { data, isLoading, error, refetch };
}

export default useFetch
