import { Router } from 'express';
const router = Router();

// Imports Controller
import UsuarioController from '../controllers/Usuario';

// Middlewares
import AuthUser from '../Middlewares/AuthUser';
import MiddlewareAdmin from '../Middlewares/MiddlewareAdmin';

router.post('/Usuario/login', UsuarioController.login);
router.post('/Usuario', UsuarioController.cadastrar);
router.put('/Usuario/:id', AuthUser, UsuarioController.atualizar);
router.delete('/Usuario/:id', AuthUser, UsuarioController.delete);
router.get('/Usuario/:id', AuthUser, UsuarioController.readById);
router.get('/Usuario', AuthUser, UsuarioController.read);

// Rotas inserir usuario do github no banco de dados.
router.get('/Usuario/Git/:nome', [AuthUser, MiddlewareAdmin], UsuarioController.cadastrarUsuarioGit);

export default router;
