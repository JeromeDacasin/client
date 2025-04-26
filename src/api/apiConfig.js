import axios from 'axios';

export const viteURI = import.meta.env.VITE_API_URI;

const axiosInstance = axios.create({
    baseURL: viteURI
});

axiosInstance.interceptors.request.use(config => {
    const token = JSON.parse(localStorage.getItem('authToken'));
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});


axiosInstance.interceptors.response.use(
    response => response,
    error => {
      if (error.response && error.response.status === 401) {

        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
  
        window.location.href = '/login';
      }
  
      return Promise.reject(error);
    }
  );

  export const headerConfig = {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('authToken'))}`,
      'Content-Type': 'application/json',
    }
  };

  export const fileUploadHeaderConfig = {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('authToken'))}`,
    }
  };
  
  export const withoutToken = {
    headers: {
      'Content-Type': 'application/json',
    }
  }

  export default axiosInstance;