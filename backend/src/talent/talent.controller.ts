import { Controller, Get, Put, Delete, Body, UseGuards } from '@nestjs/common';
import { TalentService } from './talent.service';
import { UpdateTalentDto } from './dto/update-talent.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '@prisma/client';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Talent Profile')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('talent/profile')
export class TalentController {
    constructor(private readonly talentService: TalentService) { }

    @Get()
    @Roles(Role.TALENT)
    async getProfile(@CurrentUser() user: any) {
        const data = await this.talentService.getProfile(user.id);
        return { success: true, message: 'Profile retrieved', data };
    }

    @Put()
    @Roles(Role.TALENT)
    async updateProfile(@CurrentUser() user: any, @Body() dto: UpdateTalentDto) {
        const data = await this.talentService.updateProfile(user.id, dto);
        return { success: true, message: 'Profile updated', data };
    }

    @Delete()
    @Roles(Role.TALENT)
    async deleteProfile(@CurrentUser() user: any) {
        const data = await this.talentService.deleteProfile(user.id);
        return { success: true, message: 'Profile deleted', data };
    }
}
