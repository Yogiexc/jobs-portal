import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { ApplicationService } from './application.service';
import { CreateApplicationDto } from './dto/create-application.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '@prisma/client';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Applications')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('applications')
export class ApplicationController {
    constructor(private readonly applicationService: ApplicationService) { }

    @Post()
    @Roles(Role.TALENT)
    async apply(@CurrentUser() user: any, @Body() dto: CreateApplicationDto) {
        const data = await this.applicationService.apply(user.id, dto);
        return { success: true, message: 'Application submitted successfully', data };
    }

    @Get('my')
    @Roles(Role.TALENT)
    async getMyApplications(@CurrentUser() user: any) {
        const data = await this.applicationService.getMyApplications(user.id);
        return { success: true, message: 'Your applications retrieved', data };
    }

    @Get('job/:jobId')
    @Roles(Role.RECRUITER)
    async getJobApplicants(@Param('jobId') jobId: string, @CurrentUser() user: any) {
        const data = await this.applicationService.getJobApplicants(user.id, jobId);
        return { success: true, message: 'Applicants retrieved', data };
    }
}
