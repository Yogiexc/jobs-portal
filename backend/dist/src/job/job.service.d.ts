import { PrismaService } from '../prisma/prisma.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { HttpService } from '@nestjs/axios';
export declare class JobService {
    private prisma;
    private httpService;
    constructor(prisma: PrismaService, httpService: HttpService);
    create(recruiterId: string, dto: CreateJobDto): Promise<{
        description: string;
        title: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        requirements: string[];
        skillsNeeded: string[];
        recruiterId: string;
    }>;
    findAll(): Promise<({
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
    })[]>;
    findOne(id: string): Promise<{
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
    }>;
    update(id: string, recruiterId: string, dto: UpdateJobDto): Promise<{
        description: string;
        title: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        requirements: string[];
        skillsNeeded: string[];
        recruiterId: string;
    }>;
    remove(id: string, recruiterId: string): Promise<{
        description: string;
        title: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        requirements: string[];
        skillsNeeded: string[];
        recruiterId: string;
    }>;
}
