import { Router } from 'express';
const router = Router();

// Imports Controller
import UsuarioController from '../controllers/UsuarioAdmin';
import ListaUserGit from '../controllers/UsuarioComum';
// Middlewares
import AuthUser from '../Middlewares/AuthUser';
import MiddlewareAdmin from '../Middlewares/MiddlewareAdmin';
import MiddlewareComum from '../Middlewares/MidllewareComum';

router.post('/Usuario/login', UsuarioController.login);
router.post('/Usuario', UsuarioController.cadastrar);
router.put('/Usuario/:id', AuthUser, UsuarioController.atualizar);
router.delete('/Usuario/:id', AuthUser, UsuarioController.delete);
router.get('/Usuario/:id', AuthUser, UsuarioController.readById);
router.get('/Usuario', AuthUser, UsuarioController.read);

// Rotas inserir usuario do github no banco de dados, apenas adm
router.get('/Usuario/git/user/:nome', [AuthUser, MiddlewareAdmin], UsuarioController.cadastrarUsuarioGit);

// Acessar listagem de todos user do github
router.get('/Usuario/git', [AuthUser, MiddlewareComum], UsuarioController.read);

// Criar, editar e excluir listas para organizar usuairos
router.post('/Usuario/git/lista', [AuthUser, MiddlewareComum], ListaUserGit.criarLista);
router.put('/Usuario/git/lista/:id', [AuthUser, MiddlewareComum], ListaUserGit.criarLista);
router.delete('/Usuario/git/lista/:id', [AuthUser, MiddlewareComum], ListaUserGit.criarLista);

// Adicionar usuarios na lista
router.post('/Usuario/git/adicionar/userListas', [AuthUser, MiddlewareComum], ListaUserGit.addUserLista);
router.post('/Usuario/git/deletar/userListas', [AuthUser, MiddlewareComum], ListaUserGit.deleteUserLista);
router.post('/Usuario/git/adicionar/tags', [AuthUser, MiddlewareComum], ListaUserGit.addTags);
router.get('/Usuario/git/getListas', [AuthUser, MiddlewareComum], ListaUserGit.getListas);

export default router;
