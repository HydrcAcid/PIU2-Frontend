import {createContext, useEffect, useState} from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("user")) || null);

    const login = async (inputs) => {
        console.log("Login inputs:", inputs);
        const res = await axios.post("http://localhost:3000/auth/login", inputs, { withCredentials: true });
        setCurrentUser(res.data);
    };

    const logout = async () => {
        const res = await axios.get("http://localhost:3000/auth/logout", { withCredentials: true });
        setCurrentUser(null);
    };

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(currentUser));
    }, [currentUser]);

    return <AuthContext.Provider value={{currentUser, login, logout}}>
        {children}
    </AuthContext.Provider>
}