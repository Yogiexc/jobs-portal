import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategies/jwt.strategy';
import { PrismaModule } from '../prisma/prisma.module';
import { RolesGuard } from './guards/roles.guard';

@Module({
    imports: [
        PrismaModule,
        PassportModule,
        JwtModule.register({
            secret: process.env.JWT_SECRET || 'super-secret-key-digitefa',
            signOptions: { expiresIn: '7d' },
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy, RolesGuard],
    exports: [AuthService, JwtModule, JwtStrategy, RolesGuard],
})
export class AuthModule { }
