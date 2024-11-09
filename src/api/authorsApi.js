import axios from "axios";
import headerConfig from "./apiConfig";

export const fetchAuthors = async () => {
    const response = await axios.get(`${import.meta.env.VITE_API_URI}/authors`, headerConfig);
    return response.data.data;
}