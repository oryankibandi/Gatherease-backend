import { Router } from 'express';
import * as userController from '../controllers/user.controller';

const router = Router();

router.post('/register', userController.registerUser);

router.post('/confirmation', userController.userConfirmation);

router.post('/login', userController.userLogin);

router.get('/refresh', userController.userRefreshToken);
export default router;
