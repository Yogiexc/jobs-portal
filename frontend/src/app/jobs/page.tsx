'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/axios';
import { useAuthStore } from '@/context/AuthStore';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function JobsPage() {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuthStore();
    const router = useRouter();

    useEffect(() => {
        fetchJobs();
    }, []);

    const fetchJobs = async () => {
        try {
            const res = await api.get('/jobs');
            setJobs(res.data.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex justify-between items-center">
                    <Link href="/" className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                        DIGITEFA Jobs
                    </Link>
                    <div className="flex gap-4">
                        {!user ? (
                            <>
                                <button onClick={() => router.push('/auth/login')} className="text-gray-600 hover:text-blue-600 font-medium px-4 py-2">
                                    Log in
                                </button>
                                <button onClick={() => router.push('/auth/register')} className="bg-blue-600 text-white font-medium px-4 py-2 rounded-lg hover:bg-blue-700">
                                    Sign up
                                </button>
                            </>
                        ) : (
                            <button onClick={() => router.push(`/dashboard/${user.role.toLowerCase()}`)} className="bg-blue-600 text-white font-medium px-4 py-2 rounded-lg hover:bg-blue-700">
                                Go to Dashboard
                            </button>
                        )}
                    </div>
                </div>
            </header>

            <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
                        Find Your Next Role
                    </h1>
                    <p className="mt-4 text-xl text-gray-500 max-w-2xl mx-auto">
                        Explore open opportunities from top industry partners.
                    </p>
                </div>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                    </div>
                ) : (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {jobs?.map((job: any) => (
                            <div key={job.id} className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden flex flex-col">
                                <div className="p-6 flex-1 flex flex-col">
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">{job.title}</h3>
                                    <div className="flex items-center text-sm text-gray-500 mb-4">
                                        <svg className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                        </svg>
                                        {job.recruiter?.name || 'Company'}
                                    </div>
                                    <p className="text-gray-600 text-sm line-clamp-3 mb-6 flex-1">
                                        {job.description}
                                    </p>

                                    <div className="flex flex-wrap gap-2 mb-6">
                                        {job.skillsNeeded?.slice(0, 3).map((skill: string, i: number) => (
                                            <span key={i} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                                                {skill}
                                            </span>
                                        ))}
                                        {job.skillsNeeded?.length > 3 && (
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                                +{job.skillsNeeded.length - 3} more
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 mt-auto">
                                    <Link href={`/jobs/${job.id}`} className="w-full flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 transition-colors">
                                        View Details
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {!loading && jobs?.length === 0 && (
                    <div className="text-center py-20">
                        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <h3 className="mt-2 text-sm font-medium text-gray-900">No jobs found</h3>
                        <p className="mt-1 text-sm text-gray-500">Check back later for new opportunities.</p>
                    </div>
                )}
            </main>
        </div>
    );
}
