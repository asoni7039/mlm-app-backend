import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { ReferralCode } from '../../referral/entities/referral-code.entity';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'full_name', length: 100 })
  fullName: string;

  @Column({ length: 255, unique: true })
  email: string;

  @Column({ length: 15, unique: true })
  mobile: string;

  @Column({ length: 255 })
  password: string;

  @ManyToOne(() => ReferralCode)
  @JoinColumn({ name: 'referral_code_id' })
  referralCode: ReferralCode;

  @Column({ name: 'referral_code_id', nullable: true })
  referralCodeId: number;

  @Column({ type: 'text', nullable: true })
  address: string;

  @Column({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ name: 'updated_at', type: 'timestamp', nullable: true })
  updatedAt: Date;

  @Column({ name: 'deleted_at', type: 'timestamp', nullable: true })
  deletedAt: Date;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'created_by' })
  createdBy: User;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'updated_by' })
  updatedBy: User;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'deleted_by' })
  deletedBy: User;
} 