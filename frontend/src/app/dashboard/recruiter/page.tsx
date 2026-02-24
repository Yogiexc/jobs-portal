'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/axios';
import { useAuthStore } from '@/context/AuthStore';

export default function RecruiterDashboard() {
    const { user } = useAuthStore();
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    // Form states
    const [isCreating, setIsCreating] = useState(false);
    const [formData, setFormData] = useState({ title: '', description: '', requirements: '', skillsNeeded: '' });

    useEffect(() => {
        fetchJobs();
    }, [user]);

    const fetchJobs = async () => {
        if (!user) return;
        try {
            const res = await api.get('/jobs');
            // Filter to only this recruiter's jobs because public get returns all
            const myJobs = res.data.data.filter((j: any) => j.recruiterId === user.id);
            setJobs(myJobs);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateJob = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await api.post('/jobs', {
                title: formData.title,
                description: formData.description,
                requirements: formData.requirements.split(',').map(s => s.trim()).filter(Boolean),
                skillsNeeded: formData.skillsNeeded.split(',').map(s => s.trim()).filter(Boolean)
            });
            alert('Job Created!');
            setIsCreating(false);
            setFormData({ title: '', description: '', requirements: '', skillsNeeded: '' });
            fetchJobs();
        } catch (error) {
            console.error(error);
            alert('Failed to create job');
        }
    };

    const handleDelete = async (jobId: string) => {
        if (!confirm('Delete this job?')) return;
        try {
            await api.delete(`/jobs/${jobId}`);
            setJobs(jobs.filter((j: any) => j.id !== jobId));
        } catch (error) {
            console.error(error);
            alert('Failed to delete');
        }
    }

    if (loading) return <div>Loading...</div>;

    return (
        <div className="max-w-5xl mx-auto space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Job Management</h1>
                    <p className="text-gray-500 mt-2">Manage your job postings and applicants.</p>
                </div>
                <button
                    onClick={() => setIsCreating(!isCreating)}
                    className="px-4 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition"
                >
                    {isCreating ? 'Cancel' : '+ Post New Job'}
                </button>
            </div>

            {isCreating && (
                <form onSubmit={handleCreateJob} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-4">
                    <h2 className="text-xl font-bold text-gray-800">New Job Posting</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="col-span-2 md:col-span-1">
                            <label className="block text-sm font-medium text-gray-700">Job Title</label>
                            <input required type="text" className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg bg-white"
                                value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} />
                        </div>
                        <div className="col-span-2 md:col-span-1">
                            <label className="block text-sm font-medium text-gray-700">Skills Needed (comma separated)</label>
                            <input required type="text" className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg bg-white"
                                value={formData.skillsNeeded} onChange={e => setFormData({ ...formData, skillsNeeded: e.target.value })} />
                        </div>
                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-gray-700">Description</label>
                            <textarea required rows={4} className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-black"
                                value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} />
                        </div>
                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-gray-700">Requirements (comma separated)</label>
                            <input required type="text" className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg bg-white"
                                value={formData.requirements} onChange={e => setFormData({ ...formData, requirements: e.target.value })} />
                        </div>
                    </div>
                    <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Publish Job</button>
                </form>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {jobs.length === 0 && !isCreating && <p className="text-gray-500">You haven't posted any jobs yet.</p>}
                {jobs.map((job: any) => (
                    <div key={job.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col">
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="text-xl font-bold text-gray-900">{job.title}</h3>
                            <button onClick={() => handleDelete(job.id)} className="text-red-500 hover:text-red-700 text-sm">Delete</button>
                        </div>
                        <p className="text-gray-600 text-sm line-clamp-3 mb-4 flex-1">{job.description}</p>
                        <div className="mt-auto">
                            <a href={`/dashboard/recruiter/job/${job.id}`} className="text-blue-600 hover:underline text-sm font-medium">
                                View Applicants
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
