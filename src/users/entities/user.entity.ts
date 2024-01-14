import { UpdateUserDto } from './../dto/updateUser.dto';
import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Unique,
} from 'typeorm';
import { IsEmail, IsNotEmpty, IsString, IsBoolean, IsDate, IsOptional, IsEnum } from 'class-validator';
import { Gender } from '../user.health-info.enums';
import { SignUpUserDto } from '../dto/signUpUpser.dto';

@Entity()
@Unique(['username','email'])
export class User {
    @PrimaryColumn({ type: 'uuid' })
    userId: string;

    @Column({ type: 'varchar', length: 50 })
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @Column({ type: 'varchar', length: 200 })
    @IsNotEmpty()
    password: string;

    @Column({ type: 'varchar', length: 50 })
    @IsNotEmpty()
    username: string;

    @Column({ type: 'date' })
    @IsNotEmpty()
    @IsDate()
    birthday: Date;

    @Column({ type: 'enum', enum:Gender })
    @IsNotEmpty()
    @IsEnum(Gender)
    gender: Gender;

    @Column({ type: 'varchar', length: 50, nullable: true })
    @IsString()
    @IsOptional()
    profileImage: string;

    @Column({ type: 'boolean', default: false })
    @IsBoolean()
    membership: boolean;

    @Column({ type: 'datetime' })
    @CreateDateColumn()
    createdDate: Date;

    @Column({ type: 'datetime'})
    @UpdateDateColumn()
    updatedDate: Date;

    @Column({ type: 'datetime', nullable: true })
    @DeleteDateColumn()
    deletedDate: Date;

    public signUpUserDtoToEntity (signUpUserDto: SignUpUserDto) {
      this.userId = signUpUserDto.userId;
      this.email = signUpUserDto.email;
      this.username = signUpUserDto.username;
      this.password = signUpUserDto.password;
      this.birthday = signUpUserDto.birthday;
      this.gender = signUpUserDto.gender;
    }

    public UpdateUserDtoToEntity (updateUserDto: UpdateUserDto) {
      this.username = updateUserDto.username;
      this.birthday = updateUserDto.birthday;
      this.gender = updateUserDto.gender;
    }
}