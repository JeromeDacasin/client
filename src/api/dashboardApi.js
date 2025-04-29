import api, {headerConfig, viteURI} from './apiConfig';


export const dashboardReport = async () => {
    const response = await api.get(`${viteURI}/dashboards`, {
        ...headerConfig
    });

    return response.data;
};

export const fetchBorrowerReport = async (payload) => {

    const { to, from, page} = payload;

    const response = await api.get(`${viteURI}/dashboards/borrowers?from=${from}&to=${to}&page=${page}`, {
        ...headerConfig
    });

    return response.data;
};