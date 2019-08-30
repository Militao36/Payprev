import { Router } from 'express';
const router = Router();

// Controllers
import ListaUserGit from '../controllers/UsuarioComum';
import { } from '../controllers/UsuarioComum';

// Middlewares
import AuthUser from '../Middlewares/AuthUser';
import MiddlewareComum from '../Middlewares/MidllewareComum';

// Criar, editar e excluir listas para organizar usuairos
router.post('/Usuario/git/lista', [AuthUser, MiddlewareComum], ListaUserGit.criarLista);
router.put('/Usuario/git/lista/:id', [AuthUser, MiddlewareComum], ListaUserGit.criarLista);
router.delete('/Usuario/git/lista/:id', [AuthUser, MiddlewareComum], ListaUserGit.criarLista);

// Adicionar usuarios na lista
router.post('/Usuario/git/adicionar/userListas', [AuthUser, MiddlewareComum], ListaUserGit.addUserLista);
router.post('/Usuario/git/deletar/userListas', [AuthUser, MiddlewareComum], ListaUserGit.deleteUserLista);
router.post('/Usuario/git/adicionar/tags', [AuthUser, MiddlewareComum], ListaUserGit.addTags);
router.get('/Usuario/git/getListas', [AuthUser, MiddlewareComum], ListaUserGit.getListas);

// Acessar listagem de todos user do github
router.get('/Usuario/git', [AuthUser, MiddlewareComum], ListaUserGit.getAllUserGit);

export default router;
