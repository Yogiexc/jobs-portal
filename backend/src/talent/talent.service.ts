import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateTalentDto } from './dto/update-talent.dto';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class TalentService {
    constructor(
        private prisma: PrismaService,
        private httpService: HttpService
    ) { }

    async getProfile(userId: string) {
        const profile = await this.prisma.talentProfile.findUnique({
            where: { userId },
            include: {
                user: { select: { name: true, email: true } }
            }
        });

        if (!profile) {
            throw new NotFoundException('Talent profile not found');
        }

        return profile;
    }

    async updateProfile(userId: string, dto: UpdateTalentDto) {
        const profile = await this.prisma.talentProfile.update({
            where: { userId },
            data: {
                skills: dto.skills,
                education: dto.education,
                experience: dto.experience,
            },
        });

        // Generate Text for Embedding
        const profileText = [
            ...(dto.skills || []),
            dto.education || '',
            dto.experience || ''
        ].filter(Boolean).join(' ');

        if (profileText.trim()) {
            try {
                // Call AI Service
                const response = await firstValueFrom(
                    this.httpService.post('http://localhost:8000/embed', { text: profileText })
                );

                const embedding = response.data.embedding;

                // Update Embedding via Raw SQL (Prisma unsupported workaround)
                await this.prisma.$executeRaw`
                    UPDATE "TalentProfile" 
                    SET embedding = ${embedding}::vector 
                    WHERE "userId" = ${userId}
                `;
            } catch (error) {
                console.error("Failed to generate/store embedding for TalentProfile:", error.message);
            }
        }

        return profile;
    }

    async deleteProfile(userId: string) {
        // This removes the TalentProfile, effectively resetting it
        const profile = await this.prisma.talentProfile.delete({
            where: { userId }
        });
        return profile;
    }
}
