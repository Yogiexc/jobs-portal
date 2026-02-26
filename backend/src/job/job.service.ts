import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class JobService {
    constructor(
        private prisma: PrismaService,
        private httpService: HttpService
    ) { }

    async create(recruiterId: string, dto: CreateJobDto) {
        const job = await this.prisma.job.create({
            data: {
                title: dto.title,
                description: dto.description,
                requirements: dto.requirements,
                skillsNeeded: dto.skillsNeeded,
                recruiterId,
            },
        });

        // Generate Text for Embedding
        const jobText = [
            dto.title,
            dto.description,
            ...(dto.requirements || []),
            ...(dto.skillsNeeded || [])
        ].filter(Boolean).join(' ');

        if (jobText.trim()) {
            try {
                // Call AI Service
                const response = await firstValueFrom(
                    this.httpService.post('http://localhost:8000/embed', { text: jobText })
                );

                const embedding = response.data.embedding;

                // Update Embedding via Raw SQL (Prisma unsupported workaround)
                await this.prisma.$executeRaw`
                    UPDATE "Job" 
                    SET embedding = ${embedding}::vector 
                    WHERE id = ${job.id}
                `;
            } catch (error) {
                console.error("Failed to generate/store embedding for Job:", error.message);
            }
        }

        return job;
    }

    async findAll() {
        return this.prisma.job.findMany({
            orderBy: { createdAt: 'desc' },
            include: {
                recruiter: { select: { name: true, email: true } }
            }
        });
    }

    async findOne(id: string) {
        const job = await this.prisma.job.findUnique({
            where: { id },
            include: {
                recruiter: { select: { name: true, email: true } }
            }
        });
        if (!job) throw new NotFoundException('Job not found');
        return job;
    }

    async update(id: string, recruiterId: string, dto: UpdateJobDto) {
        let job = await this.findOne(id);
        if (job.recruiterId !== recruiterId) {
            throw new ForbiddenException('You can only update your own job postings');
        }

        const updatedJob = await this.prisma.job.update({
            where: { id },
            data: {
                title: dto.title,
                description: dto.description,
                requirements: dto.requirements,
                skillsNeeded: dto.skillsNeeded,
            },
        });

        // Generate Text for Embedding
        const jobText = [
            updatedJob.title,
            updatedJob.description,
            ...(updatedJob.requirements || []),
            ...(updatedJob.skillsNeeded || [])
        ].filter(Boolean).join(' ');

        if (jobText.trim()) {
            try {
                // Call AI Service
                const response = await firstValueFrom(
                    this.httpService.post('http://localhost:8000/embed', { text: jobText })
                );

                const embedding = response.data.embedding;

                // Update Embedding via Raw SQL (Prisma unsupported workaround)
                await this.prisma.$executeRaw`
                    UPDATE "Job" 
                    SET embedding = ${embedding}::vector 
                    WHERE id = ${job.id}
                `;
            } catch (error) {
                console.error("Failed to generate/store embedding for Job:", error.message);
            }
        }

        return updatedJob;
    }

    async remove(id: string, recruiterId: string) {
        const job = await this.findOne(id);
        if (job.recruiterId !== recruiterId) {
            throw new ForbiddenException('You can only delete your own job postings');
        }
        return this.prisma.job.delete({ where: { id } });
    }
}
