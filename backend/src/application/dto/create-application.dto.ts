import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateApplicationDto {
    @ApiProperty({ example: 'UUID-OF-JOB' })
    @IsString()
    @IsNotEmpty()
    jobId: string;
}
