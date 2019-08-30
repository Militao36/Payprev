import { Router } from 'express';
const router = Router();

// Imports Controller
import UsuarioController from '../controllers/UsuarioAdmin';

// Middlewares
import AuthUser from '../Middlewares/AuthUser';
import MiddlewareAdmin from '../Middlewares/MiddlewareAdmin';

// Rotas para realizar login
router.post('/Usuario/login', UsuarioController.login);

// Rotas inserir usuario do github no banco de dados, apenas adm
router.get('/Usuario/git/user/:nome', [AuthUser, MiddlewareAdmin], UsuarioController.cadastrarUsuarioGit);

// Rota para realizar o cadastro
router.post('/Usuario', UsuarioController.cadastrar);

// Rotas para manipular os usuários cadastrados
router.put('/Usuario/git/:id', [AuthUser, MiddlewareAdmin], UsuarioController.atualizar);
router.delete('/Usuario/git/:id', [AuthUser, MiddlewareAdmin], UsuarioController.delete);
router.get('/Usuario/git/:id', [AuthUser, MiddlewareAdmin], UsuarioController.readById);
router.get('/Usuario/git', [AuthUser, MiddlewareAdmin], UsuarioController.read);

export default router;
