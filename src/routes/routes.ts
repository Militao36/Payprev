import { Router } from 'express';
const router = Router();

// Middlewares
import AuthUser from '../Middlewares/AuthUser';

router.use(AuthUser);

export default router;
