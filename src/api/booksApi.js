import api, {headerConfig, viteURI} from "./apiConfig";


export const fetchBooks = async payload => {
    const response = await api.get(`${viteURI}/books`, {
        params: payload,
        ...headerConfig
    });
    return response.data;
}

export const fetchBook = async id => {
    const response = await api.get(`${viteURI}/books/${id}`, headerConfig);
    return response.data;
}

export const updateBook = async payload => {
    const { id } = payload
    const response = await api.put(`${viteURI}/books/${id}`, payload , headerConfig);
    return response.data;
}

export const createBook = async payload => {
    const response = await api.post(`${viteURI}/books`, payload, headerConfig);
    return response.data;
}

export const deleteBook = async id => {
    const response = await api.delete(`${viteURI}/books/${id}`, headerConfig);
    return response.data;
}

export const retrieveBook = async id => {
    const payload = {
        deleted_at: null
    }
    const response = await api.patch(`${viteURI}/books/${id}/restore`, payload , headerConfig);
    return response.data;
}

export const archiveBook = async (id, reason) => {
    console.log(reason)
    const response = await api.patch(`${viteURI}/books/${id}/archive`, {reason}, headerConfig);
    return response.data;
}
