import { Router } from 'express';
const router = Router();

// Routes
import UsuarioAdmin from './UsuarioAdmin.routes';
import UsuarioComum from './UsuarioComum.routes';

router.use(UsuarioAdmin);
router.use(UsuarioComum);

export default router;
