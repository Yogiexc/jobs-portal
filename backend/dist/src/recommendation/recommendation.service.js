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
exports.RecommendationService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let RecommendationService = class RecommendationService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async recommendJobsForTalent(talentId) {
        const talent = await this.prisma.talentProfile.findUnique({
            where: { id: talentId },
        });
        if (!talent || !talent.embedding) {
            throw new common_1.NotFoundException('Talent embedding not found');
        }
        const vector = talent.embedding;
        const jobs = await this.prisma.$queryRawUnsafe(`
      SELECT *,
             1 - (embedding <=> $1::vector) AS similarity
      FROM "Job"
      WHERE embedding IS NOT NULL
      AND 1 - (embedding <=> $1::vector) > 0.6
      ORDER BY embedding <=> $1::vector
      LIMIT 5;
      `, vector);
        return jobs;
    }
    async recommendTalentsForJob(jobId) {
        const job = await this.prisma.job.findUnique({
            where: { id: jobId },
        });
        if (!job || !job.embedding) {
            throw new common_1.NotFoundException('Job embedding not found');
        }
        const vector = job.embedding;
        const talents = await this.prisma.$queryRawUnsafe(`
      SELECT *,
             1 - (embedding <=> $1::vector) AS similarity
      FROM "TalentProfile"
      WHERE embedding IS NOT NULL
      AND 1 - (embedding <=> $1::vector) > 0.6
      ORDER BY embedding <=> $1::vector
      LIMIT 5;
      `, vector);
        return talents;
    }
};
exports.RecommendationService = RecommendationService;
exports.RecommendationService = RecommendationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], RecommendationService);
//# sourceMappingURL=recommendation.service.js.map