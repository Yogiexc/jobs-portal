import { JobService } from './job.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
export declare class JobController {
    private readonly jobService;
    constructor(jobService: JobService);
    create(user: any, createJobDto: CreateJobDto): Promise<{
        success: boolean;
        message: string;
        data: {
            description: string;
            title: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            requirements: string[];
            skillsNeeded: string[];
            recruiterId: string;
        };
    }>;
    findAll(): Promise<{
        success: boolean;
        message: string;
        data: ({
            recruiter: {
                name: string;
                email: string;
            };
        } & {
            description: string;
            title: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            requirements: string[];
            skillsNeeded: string[];
            recruiterId: string;
        })[];
    }>;
    findOne(id: string): Promise<{
        success: boolean;
        message: string;
        data: {
            recruiter: {
                name: string;
                email: string;
            };
        } & {
            description: string;
            title: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            requirements: string[];
            skillsNeeded: string[];
            recruiterId: string;
        };
    }>;
    update(id: string, user: any, updateJobDto: UpdateJobDto): Promise<{
        success: boolean;
        message: string;
        data: {
            description: string;
            title: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            requirements: string[];
            skillsNeeded: string[];
            recruiterId: string;
        };
    }>;
    remove(id: string, user: any): Promise<{
        success: boolean;
        message: string;
        data: {
            description: string;
            title: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            requirements: string[];
            skillsNeeded: string[];
            recruiterId: string;
        };
    }>;
}
