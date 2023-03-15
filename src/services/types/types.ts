import { Organizer, ROLE, User } from '@prisma/client';

export interface UserRegistrationInput {
  firstName: string;
  lastName: string;
  fullName?: string;
  email: string;
  phone: string;
  password: string;
}

export interface UserAuthenticationInput {
  email: string;
  phone?: string;
  password: string;
}

export interface UserConfirmationInput {
  code: string;
  phone: string;
}

export interface OrganizerConfirmationInput {
  code: string;
  phone: string;
}

export interface OrganizerRegistrationInput {
  firstName: string;
  lastName: string;
  fullName?: string;
  email: string;
  phone: string;
  password: string;
}

export interface OrganizerLoginInput {
  email: string;
  password: string;
}

export interface UserLoginInput {
  email: string;
  password: string;
}

export interface RefreshOrganizerInput {
  ownerId: string;
  refreshToken: string;
  role: ROLE;
}

export interface AuthenticateOrganizerOutput {
  accessToken: string;
  refreshToken: string;
  organizer: Organizer;
}

export interface AuthenticateUserOutput {
  accessToken: string;
  refreshToken: string;
  user: User;
}
