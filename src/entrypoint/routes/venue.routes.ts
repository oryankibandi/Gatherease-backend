import { Router } from 'express';
import * as venueController from '../controllers/venue.controller';
import { authenticateOrganizer } from '../middlewares/auth.middleware';

const router = Router();

router.post('/', authenticateOrganizer, venueController.createVenue);

router.get('/', venueController.getVenues);

router.get('/:id', venueController.getVenueById);

router.put('/:id', authenticateOrganizer, venueController.updateVenue);

router.delete('/:id', authenticateOrganizer, venueController.deleteVenue);

export default router;
