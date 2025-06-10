import { Router } from 'express';
import { login, register } from '../controllers/users.controller';

const router = Router();
router.post('/login', login);
router.post('/register', register);
export default router;
