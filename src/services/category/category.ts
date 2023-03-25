import { ICategortRepository } from '../../adapters/repositories/types/interfaces';
import { SearchCategoryOutput } from '../types/types';
import { CategoryNotFound } from '../exceptions';
import { Category } from '@prisma/client';

export default class CategoryService {
  public static inject = ['categoryRepo'] as const;

  constructor(private readonly categoryRepo: ICategortRepository) {}

  async getCategory(categoryId: string): Promise<Category> {
    const venue = await this.categoryRepo.getCategory(categoryId);

    if (!venue) {
      throw new CategoryNotFound('Category not found');
    }

    return venue;
  }

  async searchCategory(name: string, page = 1, limit = 10): Promise<SearchCategoryOutput> {
    const startingIndex = (page - 1) * limit;
    const venues = await this.categoryRepo.searchCategoryByName(name, limit, startingIndex);

    const totalRows = await this.categoryRepo.getCategorySearchItemsCount(name);
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
