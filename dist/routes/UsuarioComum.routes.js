"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
// Controllers
const UsuarioComum_1 = __importDefault(require("../controllers/UsuarioComum"));
// Middlewares
const AuthUser_1 = __importDefault(require("../Middlewares/AuthUser"));
const MidllewareComum_1 = __importDefault(require("../Middlewares/MidllewareComum"));
// Criar, editar e excluir listas para organizar usuairos
router.post('/Usuario/comum/lista', [AuthUser_1.default, MidllewareComum_1.default], UsuarioComum_1.default.criarLista);
router.put('/Usuario/comum/lista/:id', [AuthUser_1.default, MidllewareComum_1.default], UsuarioComum_1.default.updateLista);
router.delete('/Usuario/comum/lista/:id', [AuthUser_1.default, MidllewareComum_1.default], UsuarioComum_1.default.deletLista);
router.get('/Usuario/comum/lista', [AuthUser_1.default, MidllewareComum_1.default], UsuarioComum_1.default.getListas);
// Adicionar usuarios na lista
router.post('/Usuario/comum/adicionar/userListas', [AuthUser_1.default, MidllewareComum_1.default], UsuarioComum_1.default.addUserLista);
router.post('/Usuario/comum/deletar/userListas', [AuthUser_1.default, MidllewareComum_1.default], UsuarioComum_1.default.deleteUserLista);
router.post('/Usuario/comum/adicionar/tags', [AuthUser_1.default, MidllewareComum_1.default], UsuarioComum_1.default.addTags);
router.post('/Usuario/comum/remover/tags', [AuthUser_1.default, MidllewareComum_1.default], UsuarioComum_1.default.removeTags);
// Acessar listagem de todos user do github
router.get('/Usuario/comum/getLista/completa', [AuthUser_1.default, MidllewareComum_1.default], UsuarioComum_1.default.getListaCompleta);
exports.default = router;
//# sourceMappingURL=UsuarioComum.routes.js.map