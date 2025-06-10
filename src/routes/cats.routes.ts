import { Router } from 'express';
import { getBreeds, getBreedById, searchBreeds } from '../controllers/cats.controller';
import { authenticateJWT } from '../middlewares/auth.middleware';

const router = Router();

router.get('/breeds', authenticateJWT, getBreeds);
router.get('/breeds/search', authenticateJWT, searchBreeds);
router.get('/breeds/:breed_id', authenticateJWT, getBreedById);
export default router;
