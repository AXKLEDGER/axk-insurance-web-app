'use client';
import { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/navigation';
import Loader from 'components/Loader';

const AuthContext = createContext({
    user: null,
    isAuthenticated: false,
    checkAuthStatus: () => { },
    logout: () => { },
});

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    const checkAuthStatus = async () => {
        try {
            const storedUser = JSON.parse(localStorage.getItem('user'));
            if (storedUser) {
                setUser(storedUser);
                setIsAuthenticated(true);
            } else {
                setIsAuthenticated(false);
            }
        } catch (error) {
            console.error('Error checking authentication:', error);
            setIsAuthenticated(false);
        } finally {
            setIsLoading(false);
        }
    };

    const logout = () => {
        localStorage.removeItem('user');
        setUser(null);
        setIsAuthenticated(false);
        router.replace('/auth/login');
    };

    useEffect(() => {
        checkAuthStatus();
    }, []);

    if (isLoading) {
        return <Loader />;
    }

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, checkAuthStatus, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AuthContext;
