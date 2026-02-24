'use client';

import { create } from 'zustand';

interface User {
    id: string;
    name: string;
    email: string;
    role: 'ADMIN' | 'RECRUITER' | 'TALENT';
}

interface AuthState {
    user: User | null;
    token: string | null;
    login: (user: User, token: string) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('user') || 'null') : null,
    token: typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null,
    login: (user, token) => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('accessToken', token);
            localStorage.setItem('user', JSON.stringify(user));
        }
        set({ user, token });
    },
    logout: () => {
        if (typeof window !== 'undefined') {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('user');
        }
        set({ user: null, token: null });
    },
}));
