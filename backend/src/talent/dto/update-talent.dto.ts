import { IsArray, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTalentDto {
    @ApiProperty({ type: [String], required: false })
    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    skills?: string[];

    @ApiProperty({ required: false })
    @IsString()
    @IsOptional()
    education?: string;

    @ApiProperty({ required: false })
    @IsString()
    @IsOptional()
    experience?: string;
}
