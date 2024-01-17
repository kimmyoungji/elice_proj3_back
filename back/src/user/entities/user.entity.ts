import { IsBoolean, IsDate, IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, IsTimeZone, IsUUID } from 'class-validator';
import { GoogleLoginDto } from '../../auth/dto/googleLoginDto';
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, OneToOne, PrimaryColumn, Timestamp, UpdateDateColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Gender } from '../utils/user.enums';
import { LocalSignupDto } from '../../auth/dto/localSignupDto';
import * as bcrypt from 'bcrypt';
import { HealthInfo } from './health-info.entity';
import { join } from 'path';

@Entity('user')
export class User {
  @PrimaryColumn({type:'uuid', nullable: false, unique: true})
  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @Column({type:'varchar',length:50, nullable: false, unique: true})
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Column({type:'varchar',length:50, nullable: true, unique: true})
  @IsOptional()
  providerId: string;

  @Column({type:'varchar',length:200, nullable: true})
  @IsString()
  @IsOptional()
  password: string;

  @Column({type:'varchar',length:50, nullable: false, unique: true})
  @IsString()
  @IsNotEmpty()
  username: string;

  @Column({type:'date', nullable: true})
  @IsDate()
  @IsOptional()
  birthDay: Date;

  @Column({ type: 'enum', enum:Gender, nullable: true})
  @IsEnum(Gender)
  @IsOptional()
  gender: Gender;

  @Column({ type: 'varchar', length: 50, nullable: true })
  @IsString()
  @IsOptional()
  profileImage: string;

  @Column({ type: 'boolean', default: false })
  @IsBoolean()
  @IsOptional()
  membership: boolean;

  @Column({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP' })
  @CreateDateColumn()
  createdDate: Timestamp;

  @Column({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP'})
  @UpdateDateColumn()
  updatedDate: Date;

  @Column({ type: 'timestamp with time zone', nullable: true })
  @DeleteDateColumn()
  deletedDate: Timestamp;

  @OneToOne(() => HealthInfo, healthInfo => healthInfo.user, { cascade:true })
  @JoinColumn({name: 'health_info_id'})
  healthInfo: HealthInfo;

  public mapGoogleLoginDto(googleLoginDto: GoogleLoginDto):User {
    const {providerId, email, displayName} = googleLoginDto;
    const user = new User();
    user.userId = uuidv4();
    user.providerId = providerId;
    user.email = email;
    user.username = displayName;
    return user;
  }

  public mapLocalSignupDto(localSignupDto: LocalSignupDto):User {
    const {email, password, username} = localSignupDto;
    const user = new User();
    user.userId = uuidv4();
    user.username = username;
    user.email = email;
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    user.password = hashedPassword;
    return user;
  }
}