import { Router } from 'express';
const router = Router();

// Routes
import Usuario from './UsuarioAdmin.routes';

router.use(Usuario);

export default router;
