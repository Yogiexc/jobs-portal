import { Injectable, NotFoundException, BadRequestException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateApplicationDto } from './dto/create-application.dto';

@Injectable()
export class ApplicationService {
    constructor(private prisma: PrismaService) { }

    async apply(userId: string, dto: CreateApplicationDto) {
        // Check if talent profile exists
        const talent = await this.prisma.talentProfile.findUnique({
            where: { userId },
        });

        if (!talent) {
            throw new BadRequestException('You must create a talent profile before applying.');
        }

        // Check if job exists
        const job = await this.prisma.job.findUnique({
            where: { id: dto.jobId },
        });

        if (!job) {
            throw new NotFoundException('Job not found');
        }

        // Check if already applied
        const existing = await this.prisma.application.findUnique({
            where: {
                talentId_jobId: {
                    talentId: talent.id,
                    jobId: dto.jobId,
                }
            }
        });

        if (existing) {
            throw new BadRequestException('You have already applied to this job.');
        }

        return this.prisma.application.create({
            data: {
                talentId: talent.id,
                jobId: dto.jobId,
                status: 'PENDING',
            },
        });
    }

    async getMyApplications(userId: string) {
        const talent = await this.prisma.talentProfile.findUnique({
            where: { userId },
        });

        if (!talent) return [];

        return this.prisma.application.findMany({
            where: { talentId: talent.id },
            include: {
                job: { select: { id: true, title: true, recruiter: { select: { name: true } } } }
            },
            orderBy: { createdAt: 'desc' }
        });
    }

    async getJobApplicants(recruiterId: string, jobId: string) {
        // Check job ownership
        const job = await this.prisma.job.findUnique({
            where: { id: jobId },
        });

        if (!job) throw new NotFoundException('Job not found');
        if (job.recruiterId !== recruiterId) {
            throw new ForbiddenException('You can only view applicants for your own jobs.');
        }

        return this.prisma.application.findMany({
            where: { jobId },
            include: {
                talent: {
                    include: { user: { select: { name: true, email: true } } }
                }
            },
            orderBy: { createdAt: 'desc' }
        });
    }
}
