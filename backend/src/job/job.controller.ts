import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { JobService } from './job.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '@prisma/client';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Jobs')
@Controller('jobs')
export class JobController {
    constructor(private readonly jobService: JobService) { }

    @Post()
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.RECRUITER)
    async create(@CurrentUser() user: any, @Body() createJobDto: CreateJobDto) {
        const data = await this.jobService.create(user.id, createJobDto);
        return { success: true, message: 'Job created', data };
    }

    @Get()
    async findAll() {
        const data = await this.jobService.findAll();
        return { success: true, message: 'Jobs retrieved', data };
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        const data = await this.jobService.findOne(id);
        return { success: true, message: 'Job retrieved', data };
    }

    @Put(':id')
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.RECRUITER)
    async update(@Param('id') id: string, @CurrentUser() user: any, @Body() updateJobDto: UpdateJobDto) {
        const data = await this.jobService.update(id, user.id, updateJobDto);
        return { success: true, message: 'Job updated', data };
    }

    @Delete(':id')
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.RECRUITER)
    async remove(@Param('id') id: string, @CurrentUser() user: any) {
        const data = await this.jobService.remove(id, user.id);
        return { success: true, message: 'Job deleted', data };
    }
}
