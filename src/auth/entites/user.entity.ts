import { GoogleUserProfileDto } from '../dto/googleUserProfile.dto';
import { Column, CreateDateColumn, Entity, PrimaryColumn, Timestamp } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity('users')
export class User {
  @PrimaryColumn({type:'uuid'})
  id: string;

  @Column()
  providerId: string;

  @Column()
  email: string;

  @Column()
  displayName: string;

  @Column({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP' })
  @CreateDateColumn()
  createdDate: Timestamp;

  public toUserEntity(googleUserProfileDto: GoogleUserProfileDto):User {
    const {providerId, email, displayName} = googleUserProfileDto;
    const user = new User();
    user.id = uuidv4();
    user.providerId = providerId;
    user.email = email;
    user.displayName = displayName;
    return user;
  }
}