import api, {headerConfig, viteURI} from './apiConfig';


export const fetchBorrowedBooks = async params => {
    const response = await api.get(`${viteURI}/request-books`, {
        params,
        ...headerConfig
    })

    return response.data;
}

export const fetchBorrowedBook = async id => {
    const response = await api.get(`${viteURI}/request-books/${id}`, headerConfig);
    return response.data;
}

export const updateBorrowedBook = async payload => {
    const { id } = payload;
    const response = await api.put(`${viteURI}/request-books/${id}`, payload, headerConfig);
    return response.data;
}

export const createBorrowedBook = async payload => {
    const response = await api.post(`${viteURI}/request-books`, payload, headerConfig);
    return response.data;
}

export const fetchMyHistories = async () => {
    const response = await api.get(`${viteURI}/my-books`, headerConfig);
    return response;
} 

export const exportHistories = async () => {

    const payload = {
        status: 'returned',
        export: true
    };

    try {
        const response = await api.get(`${viteURI}/exports`, {
            params: payload,
            responseType: 'blob', 
            ...headerConfig
        });

        return response;
    } catch (error) {
        console.error("Export API error:", error);
        throw new Error("Failed to export file.");
    }
}
