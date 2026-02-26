import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { RecommendationService } from './recommendation.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('recommendation')
@UseGuards(JwtAuthGuard, RolesGuard)
export class RecommendationController {
    constructor(private readonly recommendationService: RecommendationService) { }

    @Get('jobs/:talentId')
    @Roles('TALENT')
    async getRecommendedJobs(@Param('talentId') talentId: string) {
        const data = await this.recommendationService.recommendJobsForTalent(talentId);
        return {
            success: true,
            message: 'Top job recommendations retrieved',
            data,
        };
    }

    @Get('talents/:jobId')
    @Roles('RECRUITER')
    async getRecommendedTalents(@Param('jobId') jobId: string) {
        const data = await this.recommendationService.recommendTalentsForJob(jobId);
        return {
            success: true,
            message: 'Top talent recommendations retrieved',
            data,
        };
    }
}
