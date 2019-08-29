import { Router } from 'express';
const router = Router();

// Imports Controller
import UsuarioController from '../controllers/Usuario';

router.post('/Usuario/Cadastro', UsuarioController.cadastrar);
router.post('/Usuario/Cadastro', UsuarioController.cadastrar);

export default router;
