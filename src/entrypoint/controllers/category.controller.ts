import { Request, Response } from 'express';
import { categoryService } from '../../services/category';
import { ServiceError } from '../../services/exceptions';
import { searchVenueInputValidation } from '../../validators/venue.validator';
import { searchCategoryValidation } from '../../validators/category.validator';

export async function getCategory(req: Request, res: Response) {
  const { categoryId } = req.params;

  if (!categoryId) {
    return res.status(400).json({
      message: '`categoryId` field is required',
    });
  }

  try {
    const venue = await categoryService.getCategory(categoryId);

    return res.status(200).json({
      message: 'success',
      data: venue,
    });
  } catch (error) {
    if (error instanceof ServiceError) {
      return res.status(400).json({
        message: error.message,
      });
    }

    return res.status(500).json({
      message: 'Internal Server Error',
    });
  }
}

export async function searchCategory(req: Request, res: Response) {
  const { error } = searchCategoryValidation(req.query);

  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
    });
  }

  try {
    const categories = await categoryService.searchCategory(req.query);

    return res.status(200).json({
      message: 'success',
      data: categories,
    });
  } catch (error) {
    if (error instanceof ServiceError) {
      return res.status(400).json({
        message: error.message,
      });
    }

    return res.status(500).json({
      message: 'Internal Server Error',
    });
  }
}
