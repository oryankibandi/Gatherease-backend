import { PrismaClient, Venue } from '@prisma/client';
import { IVenueRepository } from './types/interfaces';
import { CreateVenueInput, UpdateVenueInput } from './types/types';
import { DeleteVenueError } from './exceptions';
import { SearchVenueData } from '../../services/types/types';

export default class VenueRepository implements IVenueRepository {
  private client;

  constructor(prismaClient: PrismaClient) {
    this.client = prismaClient;
  }

  async createVenue(data: CreateVenueInput): Promise<Venue> {
    return this.client.venue.create({
      data,
    });
  }

  async updateVenue(venueId: string, data: UpdateVenueInput): Promise<Venue> {
    return this.client.venue.update({
      where: { id: venueId },
      data,
    });
  }

  async deleteVenue(venueId: string): Promise<boolean> {
    try {
      await this.client.venue.delete({
        where: { id: venueId },
      });

      return true;
    } catch (error: any) {
      throw new DeleteVenueError(error.message);
    }
  }

  async getVenueById(venueId: string): Promise<Venue | null> {
    return this.client.venue.findUnique({
      where: { id: venueId },
    });
  }

  async searchVenuesByName(name: string, limit = 10): Promise<Venue[]> {
    return this.client.venue.findMany({
      where: {
        name: {
          contains: name,
          mode: 'insensitive',
        },
      },
      take: limit,
    });
  }

  async searchVenuesByCity(city: string, limit = 10): Promise<Venue[]> {
    return this.client.venue.findMany({
      where: {
        city: {
          contains: city,
          mode: 'insensitive',
        },
      },
      take: limit,
    });
  }

  async searchVenue(data: SearchVenueData, limit: number, page: number): Promise<Venue[]> {
    return this.client.venue.findMany({
      where: {
        AND: [
          {
            city: {
              contains: data.city ?? '',
              mode: 'insensitive',
            },
          },
          {
            country: {
              contains: data.country ?? '',
              mode: 'insensitive',
            },
          },
          {
            name: {
              contains: data.name ?? '',
              mode: 'insensitive',
            },
          },
          {
            latitude: {
              startsWith: data.latitude ?? '',
              mode: 'insensitive',
            },
          },
          {
            longitude: {
              startsWith: data.longitude ?? '',
              mode: 'insensitive',
            },
          },
        ],
      },
      skip: page,
      take: limit,
    });
  }

  async getSearchItemsCount(data: SearchVenueData): Promise<number> {
    return this.client.venue.count({
      where: {
        AND: [
          {
            city: {
              contains: data.city ?? '',
              mode: 'insensitive',
            },
          },
          {
            country: {
              contains: data.country ?? '',
              mode: 'insensitive',
            },
          },
          {
            name: {
              contains: data.name ?? '',
              mode: 'insensitive',
            },
          },
          {
            latitude: {
              startsWith: data.latitude ?? '',
              mode: 'insensitive',
            },
          },
          {
            longitude: {
              startsWith: data.longitude ?? '',
              mode: 'insensitive',
            },
          },
        ],
      },
    });
  }
}
