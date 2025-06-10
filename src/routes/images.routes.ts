import { Router } from 'express';
import { getImages } from '../controllers/images.controller';
import { authenticateJWT } from '../middlewares/auth.middleware';

const router = Router();
router.get('/imagesbybreedid', authenticateJWT, getImages);
export default router;
