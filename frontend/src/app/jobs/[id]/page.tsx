'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import api from '@/lib/axios';
import { useAuthStore } from '@/context/AuthStore';
import Link from 'next/link';

export default function JobDetailPage() {
    const { id } = useParams();
    const [job, setJob] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [applying, setApplying] = useState(false);
    const { user } = useAuthStore();
    const router = useRouter();

    useEffect(() => {
        fetchJob();
    }, [id]);

    const fetchJob = async () => {
        try {
            const res = await api.get(`/jobs/${id}`);
            setJob(res.data.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleApply = async () => {
        if (!user) {
            router.push('/auth/login');
            return;
        }

        if (user.role !== 'TALENT') {
            alert('Only talent profiles can apply to jobs.');
            return;
        }

        setApplying(true);
        try {
            await api.post('/applications', { jobId: id });
            alert('Successfully applied to this job!');
            router.push('/dashboard/talent');
        } catch (error: any) {
            alert(error.response?.data?.message || 'Failed to apply. You might have applied already.');
        } finally {
            setApplying(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex justify-center items-center bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (!job) {
        return (
            <div className="min-h-screen flexflex-col justify-center items-center bg-gray-50">
                <h2 className="text-2xl font-bold text-gray-900">Job not found</h2>
                <Link href="/jobs" className="mt-4 text-blue-600 hover:text-blue-500">Back to jobs</Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <Link href="/jobs" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 mb-8 transition-colors">
                    <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back to all jobs
                </Link>

                <div className="bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-100">
                    <div className="p-8 sm:p-12">
                        <div className="flex flex-col sm:flex-row justify-between items-start gap-6 mb-8">
                            <div>
                                <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-2">
                                    {job.title}
                                </h1>
                                <div className="flex items-center text-lg text-gray-500">
                                    <svg className="flex-shrink-0 mr-2 h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                    </svg>
                                    {job.recruiter?.name || 'Company Name'}
                                </div>
                            </div>

                            <div className="flex-shrink-0 w-full sm:w-auto">
                                <button
                                    onClick={handleApply}
                                    disabled={applying || Boolean(user && user.role !== 'TALENT')}
                                    className="w-full sm:w-auto flex justify-center items-center px-8 py-4 border border-transparent text-base font-bold rounded-xl text-white bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                                >
                                    {applying ? 'Submitting...' : 'Apply Now'}
                                </button>
                                {user && user.role !== 'TALENT' && (
                                    <p className="mt-2 text-xs text-center text-red-500">Only Talent can apply</p>
                                )}
                            </div>
                        </div>

                        <hr className="border-gray-100 my-8" />

                        <div className="prose prose-blue max-w-none">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">Job Description</h2>
                            <div className="text-gray-700 whitespace-pre-wrap leading-relaxed mb-8">
                                {job.description}
                            </div>

                            {job.requirements && job.requirements.length > 0 && (
                                <>
                                    <h2 className="text-xl font-bold text-gray-900 mb-4">Requirements</h2>
                                    <ul className="list-disc pl-5 text-gray-700 space-y-2 mb-8 marker:text-blue-500">
                                        {job.requirements.map((req: string, idx: number) => (
                                            <li key={idx}>{req}</li>
                                        ))}
                                    </ul>
                                </>
                            )}

                            {job.skillsNeeded && job.skillsNeeded.length > 0 && (
                                <>
                                    <h2 className="text-xl font-bold text-gray-900 mb-4">Skills Required</h2>
                                    <div className="flex flex-wrap gap-2">
                                        {job.skillsNeeded.map((skill: string, idx: number) => (
                                            <span key={idx} className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-semibold bg-blue-50 text-blue-700 border border-blue-100">
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
