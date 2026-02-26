import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';

export class RegisterDto {
    @ApiProperty({ example: 'John Doe' })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ example: 'john@example.com' })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({ example: 'password123', minLength: 6 })
    @IsString()
    @MinLength(6)
    @IsNotEmpty()
    password: string;

    @ApiProperty({ enum: Role, default: Role.TALENT, required: false })
    @IsEnum(Role)
    @IsOptional()
    role?: Role;
}
