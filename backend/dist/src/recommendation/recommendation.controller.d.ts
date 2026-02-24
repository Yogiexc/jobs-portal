import { RecommendationService } from './recommendation.service';
export declare class RecommendationController {
    private readonly recommendationService;
    constructor(recommendationService: RecommendationService);
    getRecommendedJobs(talentId: string): Promise<{
        success: boolean;
        message: string;
        data: unknown;
    }>;
    getRecommendedTalents(jobId: string): Promise<{
        success: boolean;
        message: string;
        data: unknown;
    }>;
}
