'use client';

import { createContext, useState, useEffect } from 'react';
import Loader from 'components/Loader';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [authState, setAuthState] = useState({
        isAuthenticated: false,
        isLoading: true,
        user: null,
    });

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));

        if (user && user.role) {
            console.log('User found in localStorage:', user);
            setAuthState({
                isAuthenticated: true,
                isLoading: false,
                user,
            });
        } else {
            console.log('No user found in localStorage.');
            setAuthState({
                isAuthenticated: false,
                isLoading: false,
                user: null,
            });
        }
    }, []);

    return (
        <AuthContext.Provider value={authState}>
            {authState.isLoading ? <Loader /> : children}
        </AuthContext.Provider>
    );
}
