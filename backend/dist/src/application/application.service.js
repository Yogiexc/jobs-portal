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
exports.ApplicationService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ApplicationService = class ApplicationService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async apply(userId, dto) {
        const talent = await this.prisma.talentProfile.findUnique({
            where: { userId },
        });
        if (!talent) {
            throw new common_1.BadRequestException('You must create a talent profile before applying.');
        }
        const job = await this.prisma.job.findUnique({
            where: { id: dto.jobId },
        });
        if (!job) {
            throw new common_1.NotFoundException('Job not found');
        }
        const existing = await this.prisma.application.findUnique({
            where: {
                talentId_jobId: {
                    talentId: talent.id,
                    jobId: dto.jobId,
                }
            }
        });
        if (existing) {
            throw new common_1.BadRequestException('You have already applied to this job.');
        }
        return this.prisma.application.create({
            data: {
                talentId: talent.id,
                jobId: dto.jobId,
                status: 'PENDING',
            },
        });
    }
    async getMyApplications(userId) {
        const talent = await this.prisma.talentProfile.findUnique({
            where: { userId },
        });
        if (!talent)
            return [];
        return this.prisma.application.findMany({
            where: { talentId: talent.id },
            include: {
                job: { select: { id: true, title: true, recruiter: { select: { name: true } } } }
            },
            orderBy: { createdAt: 'desc' }
        });
    }
    async getJobApplicants(recruiterId, jobId) {
        const job = await this.prisma.job.findUnique({
            where: { id: jobId },
        });
        if (!job)
            throw new common_1.NotFoundException('Job not found');
        if (job.recruiterId !== recruiterId) {
            throw new common_1.ForbiddenException('You can only view applicants for your own jobs.');
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
};
exports.ApplicationService = ApplicationService;
exports.ApplicationService = ApplicationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ApplicationService);
//# sourceMappingURL=application.service.js.map