import { Guest, Organizer, Profile, User } from '@prisma/client';
import { CreateGuestInput, CreateOrganizerInput, CreateProfileInput, CreateUserInput } from './types';

export interface IUserRepository {
  getUserById(userId: string): Promise<User | null>;

  getUserByEmail(email: string): Promise<User | null>;

  searchUsersByName(name: string): Promise<User[]>;

  createUser(userData: CreateUserInput): Promise<User>;

  createGuest(data: CreateGuestInput): Promise<Guest>;

  updateVerificationStatus(userId: string, isVerified: boolean): Promise<User>;
}

export interface IOrganizerRepository {
  getOrganizerById(organizerId: string): Promise<Organizer | null>;

  getOrganizerByEmail(email: string): Promise<Organizer | null>;

  searchOrganizersByName(name: string): Promise<Organizer[]>;

  createOrganizer(organizerData: CreateOrganizerInput): Promise<Organizer>;

  createProfile(data: CreateProfileInput): Promise<Organizer>;

  updateVerificationStatus(organizerId: string, isVerified: boolean): Promise<Profile>;
}
