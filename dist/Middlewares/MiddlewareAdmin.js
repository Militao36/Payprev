"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UsuarioRepository_1 = __importDefault(require("../Repositories/UsuarioRepository"));
const Retorno_1 = __importDefault(require("../Utils/Retorno"));
const TipoUsuario_1 = require("../enum/TipoUsuario");
const Admin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const idUser = req.body.userId;
    const user = yield UsuarioRepository_1.default.readById(idUser);
    if (user.length === 0) {
        return res.status(403)
            .json(Retorno_1.default.Sucesso(false, [], 'O usuário passado no token, não foi encontrada na base de dados'));
    }
    if (user[0].tipoUsuario === TipoUsuario_1.TipoUsuario.ADMIN) {
        return next();
    }
    return res.status(403).json(Retorno_1.default.Sucesso(false, [], 'Esse usuário não tem acesso'));
});
exports.default = Admin;
//# sourceMappingURL=MiddlewareAdmin.js.map