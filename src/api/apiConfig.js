

const token = JSON.parse(localStorage.getItem('authToken'));

const headerConfig = {
    headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
    }
}

export default headerConfig;