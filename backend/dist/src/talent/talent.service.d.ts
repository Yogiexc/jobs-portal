import { PrismaService } from '../prisma/prisma.service';
import { UpdateTalentDto } from './dto/update-talent.dto';
import { HttpService } from '@nestjs/axios';
export declare class TalentService {
    private prisma;
    private httpService;
    constructor(prisma: PrismaService, httpService: HttpService);
    getProfile(userId: string): Promise<{
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
    }>;
    updateProfile(userId: string, dto: UpdateTalentDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        skills: string[];
        education: string | null;
        experience: string | null;
        userId: string;
    }>;
    deleteProfile(userId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        skills: string[];
        education: string | null;
        experience: string | null;
        userId: string;
    }>;
}
