import { Organizer, PrismaClient, Profile } from '@prisma/client';
import { IOrganizerRepository } from './types/interfaces';
import { CreateOrganizerInput, CreateProfileInput } from './types/types';

export default class OrganizerRepository implements IOrganizerRepository {
  private client;

  constructor(prismaClient: PrismaClient) {
    this.client = prismaClient;
  }

  async getOrganizerById(userId: string): Promise<Organizer | null> {
    return this.client.organizer.findUnique({
      where: { id: userId },
      include: { profile: true },
    });
  }

  async getOrganizerByEmail(email: string): Promise<Organizer | null> {
    return this.client.organizer.findUnique({
      where: { email },
      include: { profile: true },
    });
  }

  async searchOrganizersByName(name: string): Promise<Organizer[]> {
    return this.client.organizer.findMany({
      where: {
        fullName: {
          contains: name,
          mode: 'insensitive',
        },
      },
    });
  }

  async createOrganizer(organizerData: CreateOrganizerInput): Promise<Organizer> {
    return this.client.organizer.create({
      data: organizerData,
    });
  }

  async createProfile(data: CreateProfileInput): Promise<Organizer> {
    return this.client.$transaction(async (prisma) => {
      const profile: Profile = await prisma.profile.create({
        data: data,
      });

      return prisma.organizer.update({
        where: { id: profile.id },
        data: {
          profileId: profile.id,
        },
        include: { profile: true },
      });
    });
  }

  async updateVerificationStatus(organizerId: string, isVerified: boolean): Promise<Profile> {
    return this.client.profile.update({
      where: { organizerId },
      data: { isVerified },
    });
  }
}
