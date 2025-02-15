import axios from 'axios';
import {headerConfig, viteURI} from './apiConfig';


export const fetchBorrowedBooks = async params => {
    const response = await axios.get(`${viteURI}/request-books`, {
        params,
        ...headerConfig
    })

    return response.data;
}

export const fetchBorrowedBook = async id => {
    const response = await axios.get(`${viteURI}/request-books/${id}`, headerConfig);
    return response.data;
}

export const updateBorrowedBook = async payload => {
    const { id } = payload;
    const response = await axios.put(`${viteURI}/request-books/${id}`, payload, headerConfig);
    return response.data;
}

export const createBorrowedBook = async payload => {
    const response = await axios.post(`${viteURI}/request-books`, payload, headerConfig);
    return response.data;
}

export const fetchMyHistories = async () => {
    const response = axios.get(`${viteURI}/my-books`, headerConfig);
    return response;
} 


