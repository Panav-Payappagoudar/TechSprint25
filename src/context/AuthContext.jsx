import React, { useState, useEffect } from 'react';
import { auth, googleProvider } from '../firebase';
import { signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import { AuthContext } from './authContext';

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(!!auth);

    useEffect(() => {
        let unsubscribe = null;
        if (auth) {
            unsubscribe = onAuthStateChanged(auth, (currentUser) => {
                if (currentUser) {
                    const formattedUser = {
                        id: currentUser.uid,
                        name: currentUser.displayName,
                        email: currentUser.email,
                        avatar: currentUser.photoURL,
                        campus: 'Main Campus'
                    };
                    setUser(formattedUser);
                    localStorage.setItem('findhub_user', JSON.stringify(formattedUser));
                } else {
                    setUser(null);
                    localStorage.removeItem('findhub_user');
                }
                setLoading(false);
            });
        }

        return () => {
            if (unsubscribe) {
                unsubscribe();
            }
        };
    }, []);

    const login = async () => {
        if (!auth) {
            console.error('Firebase auth not available');
            // For development without Firebase, simulate a login
            const mockUser = {
                uid: 'dev-user-id',
                displayName: 'Development User',
                email: 'dev@example.com',
                photoURL: null,
            };
            
            const formattedUser = {
                id: mockUser.uid,
                name: mockUser.displayName,
                email: mockUser.email,
                avatar: mockUser.photoURL,
                campus: 'Main Campus'
            };
            setUser(formattedUser);
            localStorage.setItem('findhub_user', JSON.stringify(formattedUser));
            return;
        }
        
        try {
            await signInWithPopup(auth, googleProvider);
        } catch (error) {
            console.error("Error signing in with Google", error);
            throw error;
        }
    };

    const logout = async () => {
        if (!auth) {
            console.error('Firebase auth not available');
            // For development without Firebase, just clear local user
            setUser(null);
            localStorage.removeItem('findhub_user');
            return;
        }
        
        try {
            await signOut(auth);
            setUser(null);
            localStorage.removeItem('findhub_user');
        } catch (error) {
            console.error("Error signing out", error);
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
}
