import axios from "axios";
import { headerConfig, viteURI } from "./apiConfig";

export const fetchPublishers = async payload => {
    const response = await axios.get(`${viteURI}/publishers`, {
        params: payload,
        ...headerConfig
    });
    return response.data;
}

export const fetchPublisher = async id => {
    const response = await axios.get(`${viteURI}/publishers/${id}`, headerConfig);
    return response.data;
}

export const updatePublisher = async payload => {
    const { id } = payload;
    const response = await axios.put(`${viteURI}/publishers/${id}`, payload, headerConfig);
    return response.data;
}


export const createPublisher = async payload => {
    const response = await axios.post(`${viteURI}/publishers`, payload, headerConfig);
    return response.data;
}

export const deletePublisher = async id => {
    const response = await axios.delete(`${viteURI}/publishers/${id}`, headerConfig);
    return response.data;
}