import { PrismaService } from '../prisma/prisma.service';
export declare class RecommendationService {
    private prisma;
    constructor(prisma: PrismaService);
    recommendJobsForTalent(talentId: string): Promise<unknown>;
    recommendTalentsForJob(jobId: string): Promise<unknown>;
}
