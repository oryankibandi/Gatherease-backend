import { Router } from 'express';
import { grantAccess } from '../middleware/accesscontrol.middleware';
import * as categoryController from '../controllers/category.controller';

const router = Router();

router.get('/:categoryId', categoryController.getCategory);

router.get('/', categoryController.searchCategory);

export default router;
