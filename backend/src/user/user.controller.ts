import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '@prisma/client';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get()
    @Roles(Role.ADMIN)
    async findAll() {
        const data = await this.userService.findAll();
        return { success: true, message: 'Users retrieved', data };
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        // Note: In a real app we'd want to check if the currentUser is admin or the user themselves.
        // For Phase 1 we keep it simple.
        const data = await this.userService.findOne(id);
        return { success: true, message: 'User retrieved', data };
    }
}
