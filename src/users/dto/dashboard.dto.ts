import { ApiProperty } from '@nestjs/swagger';

export class DashboardResponseDto {
  @ApiProperty()
  totalPoints: number;

  @ApiProperty()
  downlineReferralPoints: number;

  @ApiProperty()
  registrationReferralPoints: number;

  @ApiProperty()
  recentRewards: {
    points: number;
    type: string;
    createdAt: Date;
  }[];
} 