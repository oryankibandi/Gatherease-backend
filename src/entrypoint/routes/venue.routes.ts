import { Router } from 'express';
import * as venueController from '../controllers/venue.controller';

const router = Router();

router.get('/:venueId', venueController.getVenue);

router.get('/', venueController.searchVenue);

export default router;
