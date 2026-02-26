import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { TalentModule } from './talent/talent.module';
import { JobModule } from './job/job.module';
import { ApplicationModule } from './application/application.module';
import { RecommendationModule } from './recommendation/recommendation.module';

@Module({
  imports: [PrismaModule, AuthModule, UserModule, TalentModule, JobModule, ApplicationModule, RecommendationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
