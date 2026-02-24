"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const axios_1 = require("@nestjs/axios");
const rxjs_1 = require("rxjs");
let JobService = class JobService {
    prisma;
    httpService;
    constructor(prisma, httpService) {
        this.prisma = prisma;
        this.httpService = httpService;
    }
    async create(recruiterId, dto) {
        const job = await this.prisma.job.create({
            data: {
                title: dto.title,
                description: dto.description,
                requirements: dto.requirements,
                skillsNeeded: dto.skillsNeeded,
                recruiterId,
            },
        });
        const jobText = [
            dto.title,
            dto.description,
            ...(dto.requirements || []),
            ...(dto.skillsNeeded || [])
        ].filter(Boolean).join(' ');
        if (jobText.trim()) {
            try {
                const response = await (0, rxjs_1.firstValueFrom)(this.httpService.post('http://localhost:8000/embed', { text: jobText }));
                const embedding = response.data.embedding;
                await this.prisma.$executeRaw `
                    UPDATE "Job" 
                    SET embedding = ${embedding}::vector 
                    WHERE id = ${job.id}
                `;
            }
            catch (error) {
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
    async findOne(id) {
        const job = await this.prisma.job.findUnique({
            where: { id },
            include: {
                recruiter: { select: { name: true, email: true } }
            }
        });
        if (!job)
            throw new common_1.NotFoundException('Job not found');
        return job;
    }
    async update(id, recruiterId, dto) {
        let job = await this.findOne(id);
        if (job.recruiterId !== recruiterId) {
            throw new common_1.ForbiddenException('You can only update your own job postings');
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
        const jobText = [
            updatedJob.title,
            updatedJob.description,
            ...(updatedJob.requirements || []),
            ...(updatedJob.skillsNeeded || [])
        ].filter(Boolean).join(' ');
        if (jobText.trim()) {
            try {
                const response = await (0, rxjs_1.firstValueFrom)(this.httpService.post('http://localhost:8000/embed', { text: jobText }));
                const embedding = response.data.embedding;
                await this.prisma.$executeRaw `
                    UPDATE "Job" 
                    SET embedding = ${embedding}::vector 
                    WHERE id = ${job.id}
                `;
            }
            catch (error) {
                console.error("Failed to generate/store embedding for Job:", error.message);
            }
        }
        return updatedJob;
    }
    async remove(id, recruiterId) {
        const job = await this.findOne(id);
        if (job.recruiterId !== recruiterId) {
            throw new common_1.ForbiddenException('You can only delete your own job postings');
        }
        return this.prisma.job.delete({ where: { id } });
    }
};
exports.JobService = JobService;
exports.JobService = JobService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        axios_1.HttpService])
], JobService);
//# sourceMappingURL=job.service.js.map