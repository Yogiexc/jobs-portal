import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { JobService } from './job.service';
import { JobController } from './job.controller';

@Module({
    imports: [HttpModule],
    controllers: [JobController],
    providers: [JobService],
    exports: [JobService],
})
export class JobModule { }
