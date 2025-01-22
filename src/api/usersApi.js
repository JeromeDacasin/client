import axios from "axios";
import { headerConfig, viteURI } from "./apiConfig";

export const fetchUsers = async payload => {
    const response = await axios.get(`${viteURI}/users`, {
        params: payload,
        ...headerConfig
    });
    return response.data;
}

export const fetchUser = async id => {
    const response = await axios.get(`${viteURI}/users/${id}`, headerConfig);
    return response.data;
}

export const updateUser = async payload => {
    const { id } = payload;
    const response = await axios.put(`${viteURI}/users/${id}`, payload, headerConfig);
    return response.data;
}


export const createUser = async payload => {
    const response = await axios.post(`${viteURI}/users`, payload, headerConfig);
    return response.data;
}