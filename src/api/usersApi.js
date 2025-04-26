import api, { headerConfig, viteURI, withoutToken } from "./apiConfig";

export const fetchUsers = async payload => {
    const response = await api.get(`${viteURI}/users`, {
        params: payload,
        ...headerConfig
    });
    return response.data;
}

export const fetchUser = async id => {
    const response = await api.get(`${viteURI}/users/${id}`, headerConfig);
    return response.data;
}

export const updateUser = async payload => {
    const { id } = payload;
    const response = await api.put(`${viteURI}/users/${id}`, payload, headerConfig);
    return response.data;
}


export const createUser = async payload => {
    const response = await api.post(`${viteURI}/users`, payload, headerConfig);
    return response.data;
}

export const deleteUser = async id => {
    const response = await api.delete(`${viteURI}/users/${id}`, headerConfig);
    return response.data;
}

export const changePassword = async payload => {
    const response = await api.put(`${viteURI}/user/password`, payload, headerConfig);
    return response.data;
}

export const forgotPassword = async payload => {
    const response = await api.post(`${viteURI}/forgot-password`, payload, withoutToken);
    return response.data;
}