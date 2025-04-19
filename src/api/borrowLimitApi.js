import api, { headerConfig, viteURI } from "./apiConfig";

export const fetchBorrowLimits = async payload => {
    const response = await api.get(`${viteURI}/borrow-limits`, {
        params: payload,
        ...headerConfig
    });
    return response.data;
}

export const fetchBorrowLimit = async id => {
    const response = await api.get(`${viteURI}/borrow-limits/${id}`, headerConfig);
    return response.data;
}

export const updateBorrowLimit = async payload => {
    const { id } = payload;
    const response = await api.put(`${viteURI}/borrow-limits/${id}`, payload, headerConfig);
    return response.data;
}


export const createBorrowLimit = async payload => {
    const response = await api.post(`${viteURI}/borrow-limits`, payload, headerConfig);
    return response.data;
}

export const deleteBorrowLimit = async id => {
    const response = await api.delete(`${viteURI}/borrow-limits/${id}`, headerConfig);
    return response.data;
}