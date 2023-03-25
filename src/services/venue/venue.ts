import { Venue } from '@prisma/client';
import { IVenueRepository } from '../../adapters/repositories/types/interfaces';
import { VenueNotFound } from '../exceptions';
import { SearchVenueData, SearchVenueOutput } from '../types/types';

export default class VenueService {
  public static inject = ['venueRepo'] as const;

  constructor(private readonly venueRepo: IVenueRepository) {}

  async getVenue(venueId: string): Promise<Venue> {
    const venue = await this.venueRepo.getVenueById(venueId);

    if (!venue) {
      throw new VenueNotFound('Venue not found');
    }

    return venue;
  }

  async searchVenue(data: SearchVenueData, limit = 10, page = 1): Promise<SearchVenueOutput> {
    const startingIndex = (page - 1) * limit;
    const venues = await this.venueRepo.searchVenue(data, limit, startingIndex);

    const totalRows = await this.venueRepo.getSearchItemsCount(data);
    const totalPages = Math.ceil(totalRows / limit);
    const next = totalRows > startingIndex - 1 + limit ? page + 1 : null;
    const prev = startingIndex > 0 ? page - 1 : null;

    return {
      count: venues.length,
      page,
      next,
      prev,
      totalPages,
      data: venues,
    };
  }
}
