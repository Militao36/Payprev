"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Retorno_1 = __importDefault(require("../Utils/Retorno"));
const Secret_1 = __importDefault(require("../config/Secret"));
const Auth = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json(Retorno_1.default.Sucesso(false, [], 'Token não foi informado'));
    }
    const parts = authHeader.split(' ');
    if (parts.length !== 2) {
        return res.status(401).json(Retorno_1.default.Sucesso(false, [], 'Token error'));
    }
    const [scheme, token] = parts;
    if (!(/^Bearer$/i.test(scheme))) {
        return res.status(401).json(Retorno_1.default.Sucesso(false, [], 'Token em formato incorreto'));
    }
    jsonwebtoken_1.default.verify(token, Secret_1.default.secret, (err, decoded) => {
        if (err) {
            return res.status(401).json(Retorno_1.default.Sucesso(false, [], 'Token invalido'));
        }
        req.body.userId = decoded.id;
        return next();
    });
};
exports.default = Auth;
//# sourceMappingURL=AuthUser.js.map