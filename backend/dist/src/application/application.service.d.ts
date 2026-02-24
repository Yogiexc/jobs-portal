import { PrismaService } from '../prisma/prisma.service';
import { CreateApplicationDto } from './dto/create-application.dto';
export declare class ApplicationService {
    private prisma;
    constructor(prisma: PrismaService);
    apply(userId: string, dto: CreateApplicationDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        jobId: string;
        talentId: string;
        status: import(".prisma/client").$Enums.ApplicationStatus;
    }>;
    getMyApplications(userId: string): Promise<({
        job: {
            title: string;
            id: string;
            recruiter: {
                name: string;
            };
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        jobId: string;
        talentId: string;
        status: import(".prisma/client").$Enums.ApplicationStatus;
    })[]>;
    getJobApplicants(recruiterId: string, jobId: string): Promise<({
        talent: {
            user: {
                name: string;
                email: string;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            skills: string[];
            education: string | null;
            experience: string | null;
            userId: string;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        jobId: string;
        talentId: string;
        status: import(".prisma/client").$Enums.ApplicationStatus;
    })[]>;
}
