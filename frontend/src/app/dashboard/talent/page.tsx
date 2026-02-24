'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/axios';

interface Profile {
    skills: string[];
    education: string;
    experience: string;
}

export default function TalentDashboard() {
    const [profile, setProfile] = useState<Profile>({ skills: [], education: '', experience: '' });
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [skillsInput, setSkillsInput] = useState('');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [profileRes, appRes] = await Promise.all([
                api.get('/talent/profile'),
                api.get('/applications/my')
            ]);

            const p = profileRes.data.data;
            setProfile(p);
            setSkillsInput(p.skills?.join(', ') || '');
            setApplications(appRes.data.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            const skillsArray = skillsInput.split(',').map(s => s.trim()).filter(Boolean);
            await api.put('/talent/profile', {
                ...profile,
                skills: skillsArray
            });
            alert('Profile updated!');
        } catch (error) {
            console.error(error);
            alert('Failed to update profile');
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Talent Profile</h1>
                <p className="text-gray-500 mt-2">Manage your resume details and applications.</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">Edit Profile</h2>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Skills (comma separated)</label>
                        <input
                            type="text"
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg text-black bg-white focus:ring-blue-500 focus:border-blue-500"
                            value={skillsInput}
                            onChange={e => setSkillsInput(e.target.value)}
                            placeholder="React, TypeScript, Node.js"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Education</label>
                        <input
                            type="text"
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg text-black bg-white focus:ring-blue-500 focus:border-blue-500"
                            value={profile.education || ''}
                            onChange={e => setProfile({ ...profile, education: e.target.value })}
                            placeholder="B.Sc in Computer Science"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Experience</label>
                        <textarea
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg text-black bg-white focus:ring-blue-500 focus:border-blue-500"
                            rows={4}
                            value={profile.experience || ''}
                            onChange={e => setProfile({ ...profile, experience: e.target.value })}
                            placeholder="Describe your past work experience..."
                        />
                    </div>
                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    >
                        {saving ? 'Saving...' : 'Save Profile'}
                    </button>
                </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">My Applications</h2>
                {applications.length === 0 ? (
                    <p className="text-gray-500">You haven't applied to any jobs yet.</p>
                ) : (
                    <ul className="divide-y divide-gray-100">
                        {applications.map((app: any) => (
                            <li key={app.id} className="py-4 flex justify-between items-center">
                                <div>
                                    <p className="font-medium text-gray-900">{app.job.title}</p>
                                    <p className="text-sm text-gray-500">Recruiter: {app.job.recruiter.name}</p>
                                </div>
                                <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-semibold rounded-full">
                                    {app.status}
                                </span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}
