import axios from 'axios';
import {headerConfig, viteURI} from './apiConfig';


export const fetchDepartments = async params => {
    const response = await axios.get(`${viteURI}/departments`, {
        params,
        ...headerConfig
    })

    return response.data;
}

export const fetchDepartment = async id => {
    const response = await axios.get(`${viteURI}/departments/${id}`, headerConfig);
    return response.data;
}

export const updateDepartment = async payload => {
    const { id } = payload;
    const response = await axios.put(`${viteURI}/departments/${id}`, payload, headerConfig);
    return response.data;
}

export const createDepartment = async payload => {
    const response = await axios.post(`${viteURI}/departments`, payload, headerConfig);
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

