import { ROLE } from '@prisma/client';

export interface CreateUserInput {
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  phone: string;
  isVerified?: boolean;
  role?: ROLE;
}

export interface CreateGuestInput {
  eventId: string;
  userId: string;
}

export interface CreateOrganizerInput {
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  phone: string;
  role?: ROLE;
}

export interface CreateProfileInput {
  isVerified?: boolean;
  city?: string;
  street?: string;
  organizerId: string;
  jobTitle?: string;
  companyName?: string;
}
