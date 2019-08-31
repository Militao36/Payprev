import { Router } from 'express';
const router = Router();

// Controllers
import ListaUserGit from '../controllers/UsuarioComum';
import { } from '../controllers/UsuarioComum';

// Middlewares
import AuthUser from '../Middlewares/AuthUser';
import MiddlewareComum from '../Middlewares/MidllewareComum';

// Criar, editar e excluir listas para organizar usuairos
router.post('/Usuario/comum/lista', [AuthUser, MiddlewareComum], ListaUserGit.criarLista);
router.put('/Usuario/comum/lista/:id', [AuthUser, MiddlewareComum], ListaUserGit.updateLista);
router.delete('/Usuario/comum/lista/:id', [AuthUser, MiddlewareComum], ListaUserGit.deletLista);
router.get('/Usuario/comum/lista', [AuthUser, MiddlewareComum], ListaUserGit.getListas);

// Adicionar usuarios na lista
router.post('/Usuario/comum/adicionar/userListas', [AuthUser, MiddlewareComum], ListaUserGit.addUserLista);
router.post('/Usuario/comum/deletar/userListas', [AuthUser, MiddlewareComum], ListaUserGit.deleteUserLista);
router.post('/Usuario/comum/adicionar/tags', [AuthUser, MiddlewareComum], ListaUserGit.addTags);
router.post('/Usuario/comum/remover/tags', [AuthUser, MiddlewareComum], ListaUserGit.removeTags);

// Acessar listagem de todos user do github
router.get('/Usuario/comum/getLista/completa', [AuthUser, MiddlewareComum], ListaUserGit.getListaCompleta);

export default router;
