import { Event, Organizer, ROLE, User } from '@prisma/client';

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

export interface CreateEventInput {
  organizer: Organizer;
  imageUrl?: string;
  title: string;
  description: string;
  venueId: string;
  categoryId: string;
  isPublic: boolean;
  day: string;
  date: Date;
  city: string;
}
export interface EventImageInput {
  organizer: Organizer;
  image: Express.Multer.File;
}

export interface UpdateEventInputData {
  title?: string;
  description?: string;
  imageUrl?: string;
  venueId?: string;
  categoryId?: string;
  isPublic?: boolean;
  day?: string;
  date?: Date;
  city?: string;
}
export interface UpdateEventInput {
  eventId: string;
  organizer: Organizer;
  newData: UpdateEventInputData;
}

export interface DeleteEventInput {
  eventId: string;
  organizer: Organizer;
}

export interface SearchEventInput {
  city?: string;
  venue?: string;
  venueId?: string;
  startDate?: Date;
  endDate?: Date;
  isPublic?: string;
  category?: string;
}

export interface SearchEventsOutput {
  count: number;
  page: number;
  next?: number | null;
  prev?: number | null;
  totalPages?: number;
  data: Event[];
}
