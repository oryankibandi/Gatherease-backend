import { Request, Response } from 'express';
import { ServiceError } from '../../services/exceptions';
import { venueService } from '../../services/venue';
import { searchVenueInputValidation } from '../../validators/venue.validator';

export async function getVenue(req: Request, res: Response) {
  const { venueId } = req.params;

  if (!venueId) {
    return res.status(400).json({
      message: '`venueId` field is required',
    });
  }

  try {
    const venue = await venueService.getVenue(venueId);

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

export async function searchVenue(req: Request, res: Response) {
  const { error } = searchVenueInputValidation(req.query);

  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
    });
  }

  const limit: number = parseInt(req.body.limit ?? 10);
  const page: number = parseInt(req.body.page ?? 1);
  try {
    const venues = await venueService.searchVenue(req.query);

    return res.status(200).json({
      message: 'success',
      data: venues,
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
