import api, {headerConfig, viteURI} from './apiConfig';


export const dashboardReport = async () => {
    const response = await api.get(`${viteURI}/dashboards`, {
        ...headerConfig
    });

    return response.data;
};

