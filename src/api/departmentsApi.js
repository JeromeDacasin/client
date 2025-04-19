import api, {headerConfig, viteURI} from './apiConfig';


export const fetchDepartments = async params => {
    const response = await api.get(`${viteURI}/departments`, {
        params,
        ...headerConfig
    })

    return response.data;
}

export const fetchDepartment = async id => {
    const response = await api.get(`${viteURI}/departments/${id}`, headerConfig);
    return response.data;
}

export const updateDepartment = async payload => {
    const { id } = payload;
    const response = await api.put(`${viteURI}/departments/${id}`, payload, headerConfig);
    return response.data;
}

export const createDepartment = async payload => {
    const response = await api.post(`${viteURI}/departments`, payload, headerConfig);
    return response.data;
}

export const deleteDepartment = async id => {
    const response = await api.delete(`${viteURI}/departments/${id}`, headerConfig);
    return response.data;
}


