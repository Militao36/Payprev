"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
// Imports Controller
const UsuarioAdmin_1 = __importDefault(require("../controllers/UsuarioAdmin"));
// Middlewares
const AuthUser_1 = __importDefault(require("../Middlewares/AuthUser"));
const MiddlewareAdmin_1 = __importDefault(require("../Middlewares/MiddlewareAdmin"));
// Rotas para realizar login
router.post('/Usuario/login', UsuarioAdmin_1.default.login);
// Rota para realizar o cadastro
router.post('/Usuario/cadastro', UsuarioAdmin_1.default.cadastrar);
// Rotas inserir usuario do github no banco de dados, apenas adm
router.get('/Usuario/admin/user/:nome', [AuthUser_1.default, MiddlewareAdmin_1.default], UsuarioAdmin_1.default.cadastrarUsuarioGit);
// Rotas para manipular os usuários cadastrados
router.put('/Usuario/admin/:id', [AuthUser_1.default, MiddlewareAdmin_1.default], UsuarioAdmin_1.default.atualizar);
router.delete('/Usuario/admin/:id', [AuthUser_1.default, MiddlewareAdmin_1.default], UsuarioAdmin_1.default.delete);
router.get('/Usuario/admin/:id', [AuthUser_1.default, MiddlewareAdmin_1.default], UsuarioAdmin_1.default.readById);
router.get('/Usuario/admin', [AuthUser_1.default, MiddlewareAdmin_1.default], UsuarioAdmin_1.default.read);
exports.default = router;
//# sourceMappingURL=UsuarioAdmin.routes.js.map