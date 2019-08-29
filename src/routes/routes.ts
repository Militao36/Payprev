import { Router } from 'express';
const router = Router();

// Middlewares
import AuthUser from '../Middlewares/AuthUser';

// Intefaces

router.use(AuthUser);


export default router;
