import prismaClient from './client';

import CategoryRepository from './category.repository';
import EventRepository from './event.repository';
import GuestRepository from './guest.repository';
import OrganizerRepository from './organizer.repository';
import ProfileRepository from './profile.repository';
import TokenRepository from './token.repository';
import UserRepository from './user.repository';
import VenueRepository from './venue.repository';

const categoryRepo = new CategoryRepository(prismaClient);
const eventRepo = new EventRepository(prismaClient);
const guestRepo = new GuestRepository(prismaClient);
const organizerRepo = new OrganizerRepository(prismaClient);
const profileRepo = new ProfileRepository(prismaClient);
const tokenRepo = new TokenRepository(prismaClient);
const userRepo = new UserRepository(prismaClient);
const venueRepo = new VenueRepository(prismaClient);

export { categoryRepo, eventRepo, guestRepo, organizerRepo, profileRepo, tokenRepo, userRepo, venueRepo };
