import { AuthService } from './auth.service';
import { User } from './entites/user.entity';
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { GoogleStrategy } from './utils/google.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SessionSerializer } from './utils/serializer';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [AuthService, GoogleStrategy, SessionSerializer],
  controllers: [AuthController]
})
export class AuthModule {}
