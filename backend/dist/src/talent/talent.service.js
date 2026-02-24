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
exports.TalentService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const axios_1 = require("@nestjs/axios");
const rxjs_1 = require("rxjs");
let TalentService = class TalentService {
    prisma;
    httpService;
    constructor(prisma, httpService) {
        this.prisma = prisma;
        this.httpService = httpService;
    }
    async getProfile(userId) {
        const profile = await this.prisma.talentProfile.findUnique({
            where: { userId },
            include: {
                user: { select: { name: true, email: true } }
            }
        });
        if (!profile) {
            throw new common_1.NotFoundException('Talent profile not found');
        }
        return profile;
    }
    async updateProfile(userId, dto) {
        const profile = await this.prisma.talentProfile.update({
            where: { userId },
            data: {
                skills: dto.skills,
                education: dto.education,
                experience: dto.experience,
            },
        });
        const profileText = [
            ...(dto.skills || []),
            dto.education || '',
            dto.experience || ''
        ].filter(Boolean).join(' ');
        if (profileText.trim()) {
            try {
                const response = await (0, rxjs_1.firstValueFrom)(this.httpService.post('http://localhost:8000/embed', { text: profileText }));
                const embedding = response.data.embedding;
                await this.prisma.$executeRaw `
                    UPDATE "TalentProfile" 
                    SET embedding = ${embedding}::vector 
                    WHERE "userId" = ${userId}
                `;
            }
            catch (error) {
                console.error("Failed to generate/store embedding for TalentProfile:", error.message);
            }
        }
        return profile;
    }
    async deleteProfile(userId) {
        const profile = await this.prisma.talentProfile.delete({
            where: { userId }
        });
        return profile;
    }
};
exports.TalentService = TalentService;
exports.TalentService = TalentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        axios_1.HttpService])
], TalentService);
//# sourceMappingURL=talent.service.js.map