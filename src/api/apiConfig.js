

const token = JSON.parse(localStorage.getItem('authToken'));

export const headerConfig = {
    headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
    }
}

export const viteURI = import.meta.env.VITE_API_URI;
