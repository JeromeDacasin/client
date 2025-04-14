import axios from "axios";
import { headerConfig, viteURI } from "./apiConfig";

export const fetchUserHistory = async (id, page = 1) => {
    const response = await axios.get(`${viteURI}/histories/${id}?page=${page}`, headerConfig);
    return response.data;
}