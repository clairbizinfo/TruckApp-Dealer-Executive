import React, { createContext, useContext, useState, useEffect } from 'react';
import { getToken, saveToken, removeToken } from '../services/AuthenticationService/tokenService';
import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
    userName?: string;
    sub?: string;
    [key: string]: any;
}

interface AuthContextType {
    token: string | null;
    user: { name: string | null } | null;
    setAuthToken: (token: string) => Promise<void>;
    logout: () => Promise<void>;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [token, setToken] = useState<string | null>(null);
    const [user, setUser] = useState<{ name: string | null } | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Load stored token on app start
    useEffect(() => {
        const loadToken = async () => {
            const storedToken = await getToken();
            if (storedToken) {
                decodeAndSetUser(storedToken);
                setToken(storedToken);
            }
            setIsLoading(false);
        };
        loadToken();
    }, []);

    // Helper: Decode token
    const decodeAndSetUser = (jwt: string) => {
        try {
            const decoded: DecodedToken = jwtDecode(jwt);

            const extractedName =
                decoded.userName ||
                decoded.name ||
                decoded.sub ||           // fallback
                null;

            setUser({ name: extractedName });
        } catch (error) {
            console.log("Invalid JWT format", error);
            setUser(null);
        }
    };

    const setAuthToken = async (newToken: string) => {
        await saveToken(newToken);
        setToken(newToken);
        decodeAndSetUser(newToken);
    };

    const logout = async () => {
        await removeToken();
        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ token, user, setAuthToken, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within AuthProvider');
    return context;
};
