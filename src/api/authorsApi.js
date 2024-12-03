import axios from "axios";
import { headerConfig, viteURI } from "./apiConfig";

export const fetchAuthors = async payload => {
    const response = await axios.get(`${viteURI}/authors`, {
        params: payload,
        ...headerConfig
    });
    return response.data.data;
}