import { Request, Response } from 'express';
import { categoryService } from '../../services/category';
import { ServiceError } from '../../services/exceptions';

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
  const { name } = req.query;

  const limit: number = parseInt(req.body.limit ?? 10);
  const page: number = parseInt(req.body.page ?? 1);
  try {
    const categories = await categoryService.searchCategory(name as string, page, limit);

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
