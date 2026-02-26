import api from '../lib/axios';

export const getRecommendedJobs = async (profileId: string) => {
    try {
        const response = await api.get(`/recommendation/jobs/${profileId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching recommended jobs:', error);
        throw error;
    }
};

export const getRecommendedTalents = async (jobId: string) => {
    try {
        const response = await api.get(`/recommendation/talents/${jobId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching recommended talents:', error);
        throw error;
    }
};
