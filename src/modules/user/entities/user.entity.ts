import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { OTPEntity } from './otp.entity';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @Column()
  first_name: string;
  @Column()
  last_name: string;
  @Column()
  mobile: number;
  @Column({ nullable: true })
  mobile_verify: number;
  @Column()
  age: number;
  @CreateDateColumn()
  created_at: Date;
  @UpdateDateColumn()
  updated_at: Date;
  @Column()
  otpId: number;
  @OneToOne(() => UserEntity, (user) => user.otp, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'otpId' })
  otp: OTPEntity;
}
