import { NestFactory } from '@nestjs/core';
import { SeederModule } from './seeders/seeder.module';
import { SeederService } from './seeders/seeder.service';
import { MESSAGES } from '../constants/messages';

async function bootstrap() {
  const app = await NestFactory.create(SeederModule);
  const seeder = app.get(SeederService);
  
  try {
    await seeder.seedReferralCodes();
    console.log(MESSAGES.REFERRAL.SEEDING_SUCCESS);
  } catch (error) {
    console.error(`${MESSAGES.REFERRAL.SEEDING_FAILED}:`, error);
  } finally {
    await app.close();
  }
}

bootstrap(); 