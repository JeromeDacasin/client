import axios from "axios";
import { headerConfig, viteURI } from "./apiConfig";

export const fetchRoles = async payload => {
    const response = await axios.get(`${viteURI}/roles`, {
        params: payload,
        ...headerConfig
    });
    return response.data;
}

export const fetchRole = async id => {
    const response = await axios.get(`${viteURI}/roles/${id}`, headerConfig);
    return response.data;
}

export const updateRole = async payload => {
    const { id } = payload;
    const response = await axios.put(`${viteURI}/roles/${id}`, payload, headerConfig);
    return response.data;
}


export const createRole = async payload => {
    const response = await axios.post(`${viteURI}/roles`, payload, headerConfig);
    return response.data;
}