import axios from 'axios';
import {headerConfig, viteURI} from './apiConfig';


export const fetchDepartments = async params => {
    const response = await axios.get(`${viteURI}/departments`, {
        params,
        ...headerConfig
    })

    return response.data.data;
}