import React, { createContext, useContext, useState, useEffect } from 'react';
import { getToken, saveToken, removeToken } from '../services/AuthenticationService/tokenService';

interface AuthContextType {
    token: string | null;
    setAuthToken: (token: string) => Promise<void>;
    logout: () => Promise<void>;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [token, setToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadToken = async () => {
            const storedToken = await getToken();
            setToken(storedToken);
            setIsLoading(false);
        };
        loadToken();
    }, []);

    const setAuthToken = async (newToken: string) => {
        await saveToken(newToken);
        setToken(newToken);
    };

    const logout = async () => {
        await removeToken();
        setToken(null);
    };

    return (
        <AuthContext.Provider value={{ token, setAuthToken, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within AuthProvider');
    return context;
};
