import axios from "axios";
import headerConfig from "./apiConfig";


export const fetchBooks = async () => {
    const response = await axios.get(`${import.meta.env.VITE_API_URI}/books`, headerConfig);
    return response.data.data;
}