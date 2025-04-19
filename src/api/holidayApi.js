import api, {headerConfig, viteURI} from './apiConfig';


export const fetchHolidays = async params => {
    const response = await api.get(`${viteURI}/holidays`, {
        params,
        ...headerConfig
    })

    return response.data;
}

export const fetchHoliday = async id => {
    const response = await api.get(`${viteURI}/holidays/${id}`, headerConfig);
    return response.data;
}

export const updateHoliday = async payload => {
    const { id } = payload;
    const response = await api.put(`${viteURI}/holidays/${id}`, payload, headerConfig);
    return response.data;
}

export const createHoliday = async payload => {
    const response = await api.post(`${viteURI}/holidays`, payload, headerConfig);
    return response.data;
}

export const deleteHoliday = async id => {
    const response = await api.delete(`${viteURI}/holidays/${id}`, headerConfig);
    return response.data;
}

