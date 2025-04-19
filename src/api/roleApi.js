import api, { headerConfig, viteURI } from "./apiConfig";

export const fetchRoles = async payload => {
    const response = await api.get(`${viteURI}/roles`, {
        params: payload,
        ...headerConfig
    });
    return response.data;
}

export const fetchRole = async id => {
    const response = await api.get(`${viteURI}/roles/${id}`, headerConfig);
    return response.data;
}

export const updateRole = async payload => {
    const { id } = payload;
    const response = await api.put(`${viteURI}/roles/${id}`, payload, headerConfig);
    return response.data;
}


export const createRole = async payload => {
    const response = await api.post(`${viteURI}/roles`, payload, headerConfig);
    return response.data;
}

export const deleteRole = async id => {
    const response = await api.delete(`${viteURI}/roles/${id}`, headerConfig);
    return response.data;
}

export const fetchRoleChecker = async payload => {
    const response = await api.get(`${viteURI}/role-checkers`, {
        params: payload,
        ...headerConfig
    });
    return response.data;
}