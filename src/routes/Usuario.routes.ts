import { Router } from 'express';
const router = Router();

// Imports Controller
import UsuarioController from '../controllers/Usuario';

router.post('/Usuario/Cadastro', UsuarioController.cadastrar);
router.post('/Usuario/Cadastro', UsuarioController.cadastrar);
router.put('/Usuario/:id', UsuarioController.atualizar);
router.delete('/Usuario/:id', UsuarioController.delete);
router.get('/Usuario/:id', UsuarioController.readById);
router.get('/Usuario', UsuarioController.read);

export default router;
