import { Router } from 'express';
const router = Router();

// Controllers
import ListaUserGit from '../controllers/UsuarioComum';
import { } from '../controllers/UsuarioComum';

// Middlewares
import AuthUser from '../Middlewares/AuthUser';
import MiddlewareComum from '../Middlewares/MidllewareComum';

// Criar, editar e excluir listas para organizar usuairos
router.get('/Usuario/comum/lista', [AuthUser, MiddlewareComum], ListaUserGit.getListas);
router.post('/Usuario/comum/lista', [AuthUser, MiddlewareComum], ListaUserGit.criarLista);
router.put('/Usuario/comum/lista/:id', [AuthUser, MiddlewareComum], ListaUserGit.updateLista);
router.delete('/Usuario/comum/lista/:id', [AuthUser, MiddlewareComum], ListaUserGit.deletLista);

// Adicionar usuarios na lista
router.post('/Usuario/comum/adicionar/userListas', [AuthUser, MiddlewareComum], ListaUserGit.addUserLista);
router.post('/Usuario/comum/deletar/userListas', [AuthUser, MiddlewareComum], ListaUserGit.deleteUserLista);
router.post('/Usuario/comum/adicionar/tags', [AuthUser, MiddlewareComum], ListaUserGit.addTags);

// Acessar listagem de todos user do github
router.get('/Usuario/comum/getLista/completa', [AuthUser, MiddlewareComum], ListaUserGit.getListaCompleta);

export default router;