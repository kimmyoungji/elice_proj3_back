import { AuthService } from './auth.service';
import { User } from '../user/entities/user.entity';
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { GoogleStrategy } from './utils/google.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SessionSerializer } from './utils/serializer';
import { UserRepository } from '../user/user.repository';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './utils/local.strategy';
import { HealthInfo } from 'src/user/entities/health-info.entity';
import { HealthInfoRepository } from 'src/user/health-info.repository';

@Module({
  imports: [TypeOrmModule.forFeature([User, HealthInfo]), PassportModule],
  providers: [AuthService, LocalStrategy, GoogleStrategy, SessionSerializer, UserRepository, HealthInfoRepository],
  controllers: [AuthController]
})
export class AuthModule {}
