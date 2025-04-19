import api, {fileUploadHeaderConfig, viteURI} from './apiConfig';

export const importBook = async payload => {
    const response = await api.post(`${viteURI}/imports/books`, payload,fileUploadHeaderConfig)

    return response.data;
}

