import axios from "axios";
import {headerConfig, viteURI} from "./apiConfig";


export const fetchBooks = async payload => {
    const response = await axios.get(`${viteURI}/books`, {
        params: payload,
        ...headerConfig
    });
    return response.data;
}

export const fetchBook = async id => {
    const response = await axios.get(`${viteURI}/books/${id}`, headerConfig);
    return response.data;
}

export const updateBook = async payload => {
    const { id } = payload
    const response = await axios.put(`${viteURI}/books/${id}`, payload , headerConfig);
    return response.data;
}

export const createBook = async payload => {
    const response = await axios.post(`${viteURI}/books`, payload, headerConfig);
    return response.data;
}

export const deleteBook = async id => {
    const response = await axios.delete(`${viteURI}/books/${id}`, headerConfig);
    return response.data;
}

export const retrieveBook = async id => {
    const payload = {
        deleted_at: null
    }
    const response = await axios.patch(`${viteURI}/books/${id}/restore`, payload , headerConfig);
    return response.data;
}
