import { UsersRepository } from './users.repository';
import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { HealthInfoRepository } from './health-info.repository';
import { HealthInfo } from './health-info.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, HealthInfo])],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository, HealthInfoRepository]
})
export class UsersModule {}
