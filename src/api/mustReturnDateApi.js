import api, {headerConfig, viteURI} from './apiConfig';


export const fetchReturnDates = async params => {
    const response = await api.get(`${viteURI}/return-dates`, {
        params,
        ...headerConfig
    })

    return response.data;
}

export const fetchReturnDate = async id => {
    const response = await api.get(`${viteURI}/return-dates/${id}`, headerConfig);
    return response.data;
}

export const updateReturnDate = async payload => {
    const { id } = payload;
    const response = await api.put(`${viteURI}/return-dates/${id}`, payload, headerConfig);
    return response.data;
}

export const createReturnDate = async payload => {
    const response = await api.post(`${viteURI}/return-dates`, payload, headerConfig);
    return response.data;
}

export const deleteReturnDate = async id => {
    const response = await api.delete(`${viteURI}/return-dates/${id}`, headerConfig);
    return response.data;
}


