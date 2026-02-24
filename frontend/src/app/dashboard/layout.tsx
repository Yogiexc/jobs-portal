'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/context/AuthStore';
import Link from 'next/link';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const { user, logout } = useAuthStore();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        if (!localStorage.getItem('accessToken')) {
            router.push('/auth/login');
        }
    }, [router]);

    if (!mounted || !user) return <div className="p-8 text-center text-gray-500">Loading...</div>;

    const handleLogout = () => {
        logout();
        router.push('/auth/login');
    };

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-gray-200 flex flex-col hidden md:flex">
                <div className="h-16 flex items-center px-6 border-b border-gray-200">
                    <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                        DIGITEFA
                    </span>
                </div>

                <nav className="flex-1 px-4 py-6 space-y-2">
                    {user.role === 'TALENT' && (
                        <>
                            <Link href="/dashboard/talent" className="flex items-center px-3 py-2 text-gray-700 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                My Profile
                            </Link>
                            <Link href="/jobs" className="flex items-center px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors">
                                Find Jobs
                            </Link>
                        </>
                    )}

                    {user.role === 'RECRUITER' && (
                        <>
                            <Link href="/dashboard/recruiter" className="flex items-center px-3 py-2 text-gray-700 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                My Job Postings
                            </Link>
                        </>
                    )}
                </nav>

                <div className="p-4 border-t border-gray-200">
                    <div className="text-sm font-medium text-gray-900 mb-1">{user.name}</div>
                    <div className="text-xs text-gray-500 mb-4">{user.role}</div>
                    <button
                        onClick={handleLogout}
                        className="w-full text-left px-3 py-2 text-red-600 text-sm font-medium hover:bg-red-50 rounded-lg transition-colors"
                    >
                        Sign Out
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8">
                {children}
            </main>
        </div>
    );
}
