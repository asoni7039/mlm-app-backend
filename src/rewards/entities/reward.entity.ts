import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { ReferralCode, ReferralType } from '../../referral/entities/referral-code.entity';

@Entity('rewards')
export class Reward {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_id' })
  userId: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ name: 'referral_code_id' })
  referralCodeId: number;

  @ManyToOne(() => ReferralCode)
  @JoinColumn({ name: 'referral_code_id' })
  referralCode: ReferralCode;

  @Column('decimal', { precision: 10, scale: 2 })
  points: number;

  @Column({
    type: 'enum',
    enum: ReferralType
  })
  type: ReferralType;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
} 