import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity()
export class ProfileEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @Column()
  bio: string;
  @Column()
  photo: string;
  @Column()
  userId: number;
  @OneToOne(() => UserEntity, (user) => user.profile, { onDelete: 'CASCADE' })
  user: UserEntity;
}
