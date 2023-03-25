import { Category, PrismaClient } from '@prisma/client';
import { ICategortRepository } from './types/interfaces';

export default class CategoryRepository implements ICategortRepository {
  private client;

  constructor(prismaClient: PrismaClient) {
    this.client = prismaClient;
  }

  async createCategory(name: string): Promise<Category> {
    return this.client.category.create({
      data: {
        name: name,
      },
    });
  }

  async deleteCategory(categoryId: string): Promise<void> {
    await this.client.category.delete({
      where: { id: categoryId },
    });
  }

  async getCategory(categoryId: string): Promise<Category | null> {
    return this.client.category.findUnique({
      where: {
        id: categoryId,
      },
    });
  }

  async searchCategoryByName(name: string, take: number, skip: number): Promise<Category[]> {
    return this.client.category.findMany({
      where: {
        AND: [
          {
            name: {
              contains: name,
              mode: 'insensitive',
            },
          },
        ],
      },
      take,
      skip,
    });
  }

  async getCategorySearchItemsCount(name: string): Promise<number> {
    return this.client.category.count({
      where: {
        name: {
          contains: name,
          mode: 'insensitive',
        },
      },
    });
  }
}
