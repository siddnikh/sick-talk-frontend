import { createContext, useState, useEffect } from 'react';
import { login as loginService, register as registerService } from '../services/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
            setUser(storedUser);
        }
    }, []);

    const login = async (username, password) => {
        const response = await loginService(username, password);
        if (response.status === 200) setUser(response.data);
        localStorage.setItem('user', JSON.stringify(response.data));
        return response;
    };

    const register = async (username, email, password, role) => {
        const response = await registerService(username, email, password, role);
        return response;
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
