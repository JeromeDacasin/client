import axios from "axios";
import { headerConfig, viteURI } from "./apiConfig";

export const fetchAuthors = async payload => {
    const response = await axios.get(`${viteURI}/authors`, {
        params: payload,
        ...headerConfig
    });
    return response.data;
}

export const fetchAuthor = async id => {
    const response = await axios.get(`${viteURI}/authors/${id}`, headerConfig);
    return response.data;
}

export const updateAuthor = async payload => {
    const { id } = payload;
    const response = await axios.put(`${viteURI}/authors/${id}`, payload, headerConfig);
    return response.data;
}

export const createAuthor = async payload => {
    const response = await axios.post(`${viteURI}/authors`, payload, headerConfig);
    return response.data; 
}



// export const updateBook = async payload => {
//     const { id } = payload
//     const response = await axios.put(`${viteURI}/books/${id}`, payload , headerConfig);
//     return response.data;
// }

// export const createBook = async payload => {
//     const response = await axios.post(`${viteURI}/books`, payload, headerConfig);
//     return response.data;
// }

// export const deleteBook = async id => {
//     const response = await axios.delete(`${viteURI}/books/${id}`, headerConfig);
//     return response.data;
// }

