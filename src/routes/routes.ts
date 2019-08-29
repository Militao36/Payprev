import { Router } from 'express';
const router = Router();

// Routes
import Usuario from './Usuario.routes';

router.use(Usuario);

export default router;
