import { Router } from 'express';
import * as userController from '../controllers/user.controller';

const router = Router();

router.post('/register', userController.registerUser);

router.post('/confirmation', userController.userConfirmation);

export default router;
