import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    const login = async payload => {

        try {
            
            const response = await axios.post(`${import.meta.env.VITE_API_URI}/login`, payload);
            const authToken = response.data.data.token;
            const userObj = {
                user: response.data.data.role,
            };
           
            localStorage.setItem('user', JSON.stringify(userObj));
            localStorage.setItem('authToken', JSON.stringify(authToken));

            setUser(userObj);
            setToken(authToken);

            return response.data;
        } catch (error) {
            return error.response;
        }
    }

    const logout = async () => {
        try {
            const parsedToken = JSON.parse(localStorage.getItem('authToken'));
            const response = await axios.post(`${import.meta.env.VITE_API_URI}/logout`, {}, {
                headers: {
                    Authorization: `Bearer ${parsedToken}`
                }
            });
            localStorage.removeItem('authToken');
            localStorage.removeItem('user');
            setToken(null);
            setUser(null);
            return response;
        } catch(error) {
            return error;
        }
    };

    const isLoggedIn = () => {
        const user = localStorage.getItem('user');
        return !!user;
    }

    useEffect( () => {
        const storedToken  = localStorage.getItem('authToken')
        const storedUser  = localStorage.getItem('user')
        if (storedToken  && storedUser) {
            setUser(JSON.parse(storedUser));  
            setToken(JSON.parse(storedToken));  
        }

    }, []);

    return (
        <AuthContext.Provider value={{user, token, login, logout, isLoggedIn}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
