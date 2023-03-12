import { Guest, PrismaClient } from '@prisma/client';
import { IGuestRepository } from './types/interfaces';
import { DeleteGuetError } from './exceptions';
import { CreateGuestInput } from './types/types';

export default class GuestRepository implements IGuestRepository {
  private client;

  constructor(prismaClient: PrismaClient) {
    this.client = prismaClient;
  }

  async getGuest(guestId: string): Promise<Guest | null> {
    return this.client.guest.findUnique({
      where: { id: guestId },
      include: {
        user: true,
        event: true,
      },
    });
  }

  async deleteGuest(guestId: string): Promise<void> {
    try {
      await this.client.guest.delete;
    } catch (error: any) {
      throw new DeleteGuetError(error.message);
    }
  }

  async createGuest(data: CreateGuestInput): Promise<Guest> {
    return this.client.guest.create({
      data,
    });
  }

  async markGuestAsAttended(guestId: string): Promise<Guest> {
    return this.client.guest.update({
      where: { id: guestId },
      data: {
        attended: true,
      },
    });
  }

  async retrieveGuestList(eventId: string): Promise<Guest[]> {
    return this.client.guest.findMany({
      where: {
        eventId,
      },
    });
  }
}
