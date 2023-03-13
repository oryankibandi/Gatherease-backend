import { User } from '@prisma/client';

export interface VerificationSmsInput {
  recepientPhone: string;
  name: string;
  code: string;
}

export interface WelcomeSmsInput {
  user: User;
}
