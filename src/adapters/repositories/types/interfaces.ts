import { Guest, Organizer, Profile, User, Venue, Event, Category, Token } from '@prisma/client';
import {
  CreateEventInput,
  CreateGuestInput,
  CreateOrganizerInput,
  CreateProfileInput,
  CreateTokenInput,
  CreateUserInput,
  CreateVenueInput,
  UpdateEventInput,
  UpdateOrganizerProfileInput,
  UpdateVenueInput,
} from './types';

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

export interface IVenueRepository {
  createVenue(data: CreateVenueInput): Promise<Venue>;

  updateVenue(venueId: string, data: UpdateVenueInput): Promise<Venue>;

  deleteVenue(venueId: string): Promise<boolean>;

  getVenueById(venueId: string): Promise<Venue | null>;

  searchVenuesByName(name: string): Promise<Venue[]>;

  searchVenuesByCity(city: string): Promise<Venue[]>;
}

export interface IProfileRepositiory {
  getOrganizerProfile(organizerId: string): Promise<Profile | null>;

  updateProfileDetails(profileId: string, data: UpdateOrganizerProfileInput): Promise<Profile>;
}

export interface IEventRepository {
  createEvent(data: CreateEventInput): Promise<Event>;

  getEvent(eventId: string): Promise<Event | null>;

  deleteEvent(eventId: string): Promise<void>;

  updateEvent(eventId: string, data: UpdateEventInput): Promise<Event>;

  searchEventByCity(city: string): Promise<Event[]>;

  searchEventByVenue(venueName: string): Promise<Event[]>;

  searchEventByCategory(categoryId: string): Promise<Event[]>;

  searchEventByStatus(isPublic: boolean): Promise<Event[]>;
}

export interface IGuestRepository {
  getGuest(guestId: string): Promise<Guest | null>;

  deleteGuest(guestId: string): Promise<void>;

  createGuest(data: CreateGuestInput): Promise<Guest>;

  markGuestAsAttended(guestId: string): Promise<Guest>;

  retrieveGuestList(eventId: string): Promise<Guest[]>;
}

export interface ICategortRepository {
  createCategory(name: string): Promise<Category>;

  deleteCategory(categoryId: string): Promise<void>;
}

export interface ITokenRepository {
  createToken(data: CreateTokenInput): Promise<Token>;

  deleteToken(id: string): Promise<void>;

  getToken(token: string): Promise<Token | null>;

  getUserTokens(ownerId: string): Promise<Token[]>;

  deleteUserTokens(ownerId: string): Promise<void>;
}
