export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data?: T;
    meta?: {
        page?: number;
        limit?: number;
        total?: number;
    };
}

// Example usage in API:
// return { success: true, message: 'Jobs fetched', data: jobs, meta: { total: 10 } };
