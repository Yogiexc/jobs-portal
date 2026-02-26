import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TalentService } from './talent.service';
import { TalentController } from './talent.controller';

@Module({
    imports: [HttpModule],
    controllers: [TalentController],
    providers: [TalentService],
    exports: [TalentService],
})
export class TalentModule { }
