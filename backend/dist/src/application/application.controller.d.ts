import { ApplicationService } from './application.service';
import { CreateApplicationDto } from './dto/create-application.dto';
export declare class ApplicationController {
    private readonly applicationService;
    constructor(applicationService: ApplicationService);
    apply(user: any, dto: CreateApplicationDto): Promise<{
        success: boolean;
        message: string;
        data: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            jobId: string;
            talentId: string;
            status: import(".prisma/client").$Enums.ApplicationStatus;
        };
    }>;
    getMyApplications(user: any): Promise<{
        success: boolean;
        message: string;
        data: ({
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
        })[];
    }>;
    getJobApplicants(jobId: string, user: any): Promise<{
        success: boolean;
        message: string;
        data: ({
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
        })[];
    }>;
}
