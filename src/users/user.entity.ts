import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, IsBoolean, IsDate, IsOptional } from 'class-validator';

@Entity('user')
export class User {
    @ApiProperty({ description: '사용자의 고유 ID' })
    @PrimaryColumn({ type: 'varchar', length: 36 })
    user_id: string;

    @ApiProperty({ description: '사용자의 이메일' })
    @Column({ type: 'varchar', length: 50 })
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({ description: '사용자의 비밀번호' })
    @Column({ type: 'varchar', length: 200 })
    @IsNotEmpty()
    password: string;

    @ApiProperty({ description: '사용자의 사용자 이름' })
    @Column({ type: 'varchar', length: 50 })
    @IsNotEmpty()
    username: string;

    @ApiProperty({ description: '사용자의 생일' })
    @Column({ type: 'datetime' })
    @IsNotEmpty()
    @IsDate()
    birthday: Date;

    @ApiProperty({ description: '사용자의 성별' })
    @Column({ type: 'boolean' })
    @IsNotEmpty()
    @IsBoolean()
    gender: boolean;

    @ApiProperty({ description: '사용자의 프로필 이미지' })
    @Column({ type: 'varchar', length: 50, nullable: true })
    @IsString()
    @IsOptional()
    profile_image: string;

    @ApiProperty({ description: '사용자의 멤버십 상태' })
    @Column({ type: 'boolean', default: false })
    @IsBoolean()
    membership: boolean;

    @ApiProperty({ description: '사용자가 생성된 날짜' })
    @CreateDateColumn()
    created_date: Date;

    @ApiProperty({ description: '사용자 정보가 업데이트된 날짜' })
    @UpdateDateColumn()
    updated_date: Date;

    @ApiProperty({ description: '사용자 정보가 삭제된 날짜' })
    @Column({ type: 'datetime', nullable: true })
    @DeleteDateColumn()
    deleted_date: Date;
}