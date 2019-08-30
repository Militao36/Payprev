import { Router } from 'express';
const router = Router();

// Imports Controller
import UsuarioController from '../controllers/UsuarioAdmin';

// Middlewares
import AuthUser from '../Middlewares/AuthUser';
import MiddlewareAdmin from '../Middlewares/MiddlewareAdmin';

// Rotas para realizar login
router.post('/Usuario/login', UsuarioController.login);
// Rota para realizar o cadastro
router.post('/Usuario/cadastro', UsuarioController.cadastrar);

// Rotas inserir usuario do github no banco de dados, apenas adm
router.get('/Usuario/admin/user/:nome', [AuthUser, MiddlewareAdmin], UsuarioController.cadastrarUsuarioGit);

// Rotas para manipular os usuários cadastrados
router.put('/Usuario/admin/:id', [AuthUser, MiddlewareAdmin], UsuarioController.atualizar);
router.delete('/Usuario/admin/:id', [AuthUser, MiddlewareAdmin], UsuarioController.delete);
router.get('/Usuario/admin/:id', [AuthUser, MiddlewareAdmin], UsuarioController.readById);
router.get('/Usuario/admin', [AuthUser, MiddlewareAdmin], UsuarioController.read);

export default router;
