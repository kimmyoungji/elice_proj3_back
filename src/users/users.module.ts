import { UsersRepository } from './repositories/users.repository';
import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { HealthInfoRepository } from './repositories/health-info.repository';
import { HealthInfo } from './entities/health-info.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, HealthInfo])],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository, HealthInfoRepository]
})
export class UsersModule {}
