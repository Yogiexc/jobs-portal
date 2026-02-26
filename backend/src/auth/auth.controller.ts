import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('register')
    @ApiOperation({ summary: 'Register a new user' })
    @ApiResponse({ status: 201, description: 'User successfully registered.' })
    @ApiResponse({ status: 400, description: 'Bad request.' })
    async register(@Body() dto: RegisterDto) {
        const data = await this.authService.register(dto);
        return {
            success: true,
            message: 'User registered successfully',
            data,
        };
    }

    @Post('login')
    @ApiOperation({ summary: 'Login and get JWT token' })
    @ApiResponse({ status: 200, description: 'User successfully logged in.' })
    @ApiResponse({ status: 401, description: 'Unauthorized.' })
    async login(@Body() dto: LoginDto) {
        const data = await this.authService.login(dto);
        return {
            success: true,
            message: 'Login successful',
            data,
        };
    }
}
