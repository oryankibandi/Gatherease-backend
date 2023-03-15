import { Router } from 'express';
import * as organizerController from '../controllers/organizer.controller';

const router = Router();

router.post('/register', organizerController.registerOrganizer);

router.post('/confirmation', organizerController.organizerConfirmation);

router.post('/login', organizerController.organizerLogin);

router.get('/refresh', organizerController.organizerRefreshToken);

export default router;
