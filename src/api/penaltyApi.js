import axios from 'axios';
import {headerConfig, viteURI} from './apiConfig';


export const fetchFines = async params => {
    const response = await axios.get(`${viteURI}/penalties`, {
        params,
        ...headerConfig
    })

    return response.data;
}

export const fetchPenalty = async id => {
    const response = await axios.get(`${viteURI}/penalties/${id}`, headerConfig);
    return response.data;
}

export const updatePenalty = async payload => {
    const { id } = payload;
    const response = await axios.put(`${viteURI}/penalties/${id}`, payload, headerConfig);
    return response.data;
}

export const createPenalty = async payload => {
    const response = await axios.post(`${viteURI}/penalties`, payload, headerConfig);
    return response.data;
}

export const deletePenalty = async id => {
    const response = await axios.delete(`${viteURI}/penalties/${id}`, headerConfig);
    return response.data;
}

