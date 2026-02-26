import { IsArray, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateJobDto {
    @ApiProperty({ example: 'Software Engineer' })
    @IsString()
    @IsNotEmpty()
    title: string;

    @ApiProperty({ example: 'We are looking for a skilled developer...' })
    @IsString()
    @IsNotEmpty()
    description: string;

    @ApiProperty({ example: ['Bachelor Degree', '3+ years of experience'] })
    @IsArray()
    @IsString({ each: true })
    requirements: string[];

    @ApiProperty({ example: ['React', 'Node.js', 'PostgreSQL'] })
    @IsArray()
    @IsString({ each: true })
    skillsNeeded: string[];
}
