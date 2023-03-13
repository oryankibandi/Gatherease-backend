import { User } from '@prisma/client';

export interface OnUserRegistrationInput {
  user: User;
  code: string;
}

export interface OnUserConfirmationInput {
  user: User;
}
