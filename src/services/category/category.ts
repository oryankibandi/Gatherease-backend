import { ICategortRepository } from '../../adapters/repositories/types/interfaces';
import { SearchCategoryInputData, SearchCategoryOutput } from '../types/types';
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

  async searchCategory(data: SearchCategoryInputData): Promise<SearchCategoryOutput> {
    const page: number = parseInt(data.page ?? '1', 10);
    const limit: number = parseInt(data.count ?? '10', 10);

    const startingIndex = (page - 1) * limit;
    const categories = await this.categoryRepo.searchCategoryByName(limit, startingIndex, data.name);

    const totalRows = await this.categoryRepo.getCategorySearchItemsCount(data.name);
    const totalPages = Math.ceil(totalRows / limit);
    const next = page < totalPages ? page + 1 : null;
    const prev = startingIndex > 0 ? page - 1 : null;

    return {
      count: categories.length,
      page,
      next,
      prev,
      totalPages,
      data: categories,
    };
  }
}
