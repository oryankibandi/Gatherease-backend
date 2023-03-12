import { PrismaClient, Event } from '@prisma/client';
import { IEventRepository } from './types/interfaces';
import { CreateEventInput, UpdateEventInput, UpdateVenueInput } from './types/types';
import { DeleteEventError } from './exceptions';

export default class EventRepository implements IEventRepository {
  private client;

  constructor(prismaClient: PrismaClient) {
    this.client = prismaClient;
  }

  async createEvent(data: CreateEventInput): Promise<Event> {
    return this.client.event.create({
      data,
    });
  }

  async getEvent(eventId: string): Promise<Event | null> {
    return this.client.event.findUnique({
      where: { id: eventId },
      include: {
        venue: true,
        category: true,
      },
    });
  }

  async deleteEvent(eventId: string): Promise<void> {
    try {
      await this.client.event.delete({
        where: { id: eventId },
      });
    } catch (error: any) {
      throw new DeleteEventError(error.message);
    }
  }

  async updateEvent(eventId: string, data: UpdateEventInput): Promise<Event> {
    return this.client.event.update({
      where: { id: eventId },
      data,
    });
  }

  searchEventByCity(city: string, limit = 10): Promise<Event[]> {
    return this.client.event.findMany({
      where: {
        city: {
          contains: city,
          mode: 'insensitive',
        },
      },
      take: limit,
    });
  }

  searchEventByVenue(venueId: string, limit = 10): Promise<Event[]> {
    return this.client.event.findMany({
      where: {
        venueId: {
          contains: venueId,
          mode: 'insensitive',
        },
      },
      take: limit,
    });
  }

  searchEventByCategory(categoryId: string, limit = 10): Promise<Event[]> {
    return this.client.event.findMany({
      where: {
        categoryId: {
          contains: categoryId,
          mode: 'insensitive',
        },
      },
      take: limit,
    });
  }

  searchEventByStatus(isPublic: boolean, limit = 10): Promise<Event[]> {
    return this.client.event.findMany({
      where: {
        isPublic,
      },
      take: limit,
    });
  }
}
