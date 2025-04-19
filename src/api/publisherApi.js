import api, { headerConfig, viteURI } from "./apiConfig";

export const fetchPublishers = async payload => {
    const response = await api.get(`${viteURI}/publishers`, {
        params: payload,
        ...headerConfig
    });
    return response.data;
}

export const fetchPublisher = async id => {
    const response = await api.get(`${viteURI}/publishers/${id}`, headerConfig);
    return response.data;
}

export const updatePublisher = async payload => {
    const { id } = payload;
    const response = await api.put(`${viteURI}/publishers/${id}`, payload, headerConfig);
    return response.data;
}


export const createPublisher = async payload => {
    const response = await api.post(`${viteURI}/publishers`, payload, headerConfig);
    return response.data;
}

export const deletePublisher = async id => {
    const response = await api.delete(`${viteURI}/publishers/${id}`, headerConfig);
    return response.data;
}