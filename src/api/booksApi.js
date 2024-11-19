import axios from "axios";
import headerConfig from "./apiConfig";


const viteURI = import.meta.env.VITE_API_URI;

export const fetchBooks = async () => {
    const response = await axios.get(`${viteURI}/books`, headerConfig);
    return response.data.data;
}


export const fetchBook = async id => {
    const response = await axios.get(`${viteURI}/books/${id}`, headerConfig);
    return response.data;
}