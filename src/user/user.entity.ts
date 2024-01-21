import {
  BaseEntity,
  Column,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  @ApiProperty({ description: "user_id" })
  user_id: string;

  @Column()
  @ApiProperty({ description: "이메일" })
  email: string;

  @Column()
  @ApiProperty({ description: "비밀번호" })
  password: string;

  @Column()
  @ApiProperty({ description: "회원 이름" })
  username: string;

  @Column()
  @ApiProperty({ description: "회원 생년월일" })
  birthday: Date;

  @Column()
  @ApiProperty({ description: "회원 성별" })
  gender: boolean;

  @Column()
  @ApiProperty({ description: "프로필 이미지" })
  profile_image: string;

  @Column({ default: false })
  @ApiProperty({ description: "멤버십 여부" })
  membership: boolean;

  @Column()
  @ApiProperty({ description: "회원가입 날짜" })
  created_date: Date;

  @UpdateDateColumn()
  @ApiProperty({ description: "회원 정보 수정날짜" })
  updated_date: Date;

  @DeleteDateColumn()
  @ApiProperty({ description: "탈퇴 날짜" })
  deleted_date: Date;
}
