import { IEventRepository, IOrganizerRepository } from '../../adapters/repositories/types/interfaces';
import { ICloudinaryImageService } from '../../../lib/cloudinary/types/interfaces';
import { Event } from '.prisma/client';
import {
  CreateEventInput,
  DeleteEventInput,
  SearchEventInput,
  SearchEventsOutput,
  UpdateEventInput,
} from '../types/types';
import { ICodeGenerator } from '../../utils/types/interfaces';
import { EventNotFound, ImageUploadError, UnauthorizedAction } from '../exceptions';

export default class EventService {
  public static inject = ['eventRepo', 'organizerRepo', 'cloudinaryImageService', 'codeGenerator'] as const;

  constructor(
    private readonly eventRepo: IEventRepository,
    private readonly organizerRepo: IOrganizerRepository,
    private readonly cloudinaryImageService: ICloudinaryImageService,
    private readonly codeGenerator: ICodeGenerator
  ) {}

  async createEvent(data: CreateEventInput): Promise<Event> {
    // create entry in DB
    if (data.imageUrl) {
      const newEvent = await this.eventRepo.createEvent({
        title: data.title,
        description: data.description,
        venueId: data.venueId,
        imageUrl: data.imageUrl,
        categoryId: data.categoryId,
        isPublic: data.isPublic,
        day: data.day,
        date: data.date,
        city: data.city,
        organizerId: data.organizer.id,
      });

      return newEvent;
    }
    const newEvent = await this.eventRepo.createEvent({
      title: data.title,
      description: data.description,
      venueId: data.venueId,
      categoryId: data.categoryId,
      isPublic: data.isPublic,
      day: data.day,
      date: data.date,
      city: data.city,
      organizerId: data.organizer.id,
    });

    return newEvent;
  }

  async getEvent(eventId: string): Promise<Event> {
    const event = await this.eventRepo.getEvent(eventId);

    if (!event) throw new EventNotFound('Event not found');

    return event;
  }

  async updateEventDetails(data: UpdateEventInput): Promise<Event> {
    const currentEvent = await this.getEvent(data.eventId);

    if (currentEvent.organizerId !== data.organizer.id) {
      throw new UnauthorizedAction('Cannot update an event you did not create');
    }

    const newEvent = await this.eventRepo.updateEvent(data.eventId, { ...data.newData });

    return newEvent;
  }

  async deleteEvent(data: DeleteEventInput): Promise<boolean> {
    const event = await this.getEvent(data.eventId);

    if (event.organizerId !== data.organizer.id) {
      throw new UnauthorizedAction('Cannot delete an event you did not create');
    }

    await this.eventRepo.deleteEvent(data.eventId);

    return true;
  }

  async searchEvent(searchData: SearchEventInput, limit = 10, page = 1): Promise<SearchEventsOutput> {
    const startingIndex = (page - 1) * limit;
    const events = await this.eventRepo.searchEvents({
      limit,
      page: startingIndex,
      filters: {
        ...searchData,
      },
    });

    const totalRows = await this.eventRepo.getCount();
    const totalPages = Math.ceil(totalRows / limit);
    const next = totalRows > startingIndex - 1 + limit ? page + 1 : null;
    const prev = startingIndex > 0 ? page - 1 : null;

    return {
      count: events.length,
      page,
      next,
      prev,
      totalPages,
      data: events,
    };
  }
}
