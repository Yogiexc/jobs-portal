import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class RecommendationService {
    constructor(private prisma: PrismaService) { }

    async recommendJobsForTalent(talentId: string) {
        const talent: any = await this.prisma.talentProfile.findUnique({
            where: { id: talentId },
        });

        if (!talent || !talent.embedding) {
            throw new NotFoundException('Talent embedding not found');
        }

        const vector = talent.embedding;

        const jobs = await this.prisma.$queryRawUnsafe(
            `
      SELECT *,
             1 - (embedding <=> $1::vector) AS similarity
      FROM "Job"
      WHERE embedding IS NOT NULL
      AND 1 - (embedding <=> $1::vector) > 0.6
      ORDER BY embedding <=> $1::vector
      LIMIT 5;
      `,
            vector
        );

        return jobs;
    }

    async recommendTalentsForJob(jobId: string) {
        const job: any = await this.prisma.job.findUnique({
            where: { id: jobId },
        });

        if (!job || !job.embedding) {
            throw new NotFoundException('Job embedding not found');
        }

        const vector = job.embedding;

        const talents = await this.prisma.$queryRawUnsafe(
            `
      SELECT *,
             1 - (embedding <=> $1::vector) AS similarity
      FROM "TalentProfile"
      WHERE embedding IS NOT NULL
      AND 1 - (embedding <=> $1::vector) > 0.6
      ORDER BY embedding <=> $1::vector
      LIMIT 5;
      `,
            vector
        );

        return talents;
    }
}
