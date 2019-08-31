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
const GenerateToken_1 = __importDefault(require("../Utils/GenerateToken"));
const util_1 = require("util");
const RetirarCharCpf_1 = __importDefault(require("../Utils/RetirarCharCpf"));
const axios_1 = __importDefault(require("axios"));
const UsuariosGitRepository_1 = __importDefault(require("../Repositories/UsuariosGitRepository"));
class UsuarioController {
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, senha } = req.body;
            const user = yield UsuarioRepository_1.default.readByEmail(email);
            if (user.length === 0) {
                return res
                    .status(401)
                    .json(Retorno_1.default.Sucesso(false, [], 'Usuario não encontrado/Não autorizado'));
            }
            if (user[0].senha !== senha) {
                return res.status(401)
                    .json(Retorno_1.default.Sucesso(false, [], 'Senha invalida'));
            }
            user[0].senha = '*******';
            res.status(201).json(Retorno_1.default.Sucesso(true, [Object.assign(Object.assign({}, user[0]), { token: GenerateToken_1.default(user[0].idUser) })], 'Login efetuado com sucesso'));
        });
    }
    cadastrar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, senha, cpf, tipoUsuario } = req.body;
                const body = { email, senha, cpf: RetirarCharCpf_1.default(cpf), tipoUsuario };
                const validacoes = yield UsuarioRepository_1.default.validacoes(body, false);
                if (validacoes.length > 0) {
                    return res.status(400)
                        .json(Retorno_1.default.Sucesso(false, [...validacoes], 'O cadastro não passou em algumas validações'));
                }
                const user = yield UsuarioRepository_1.default.save(body);
                res.status(201)
                    .json(Retorno_1.default.Sucesso(true, [...user], 'Usuario cadastrado com sucesso'));
            }
            catch (error) {
                return res.status(400)
                    .json(Retorno_1.default.Sucesso(false, [error], 'Erro ao realizar cadastro'));
            }
        });
    }
    atualizar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, senha, cpf, tipoUsuario } = req.body;
                const body = { email, senha, cpf: RetirarCharCpf_1.default(cpf), tipoUsuario };
                if (util_1.isNumber(req.params.id)) {
                    return res.status(400)
                        .json(Retorno_1.default.Sucesso(false, [], 'Parametro passando não e um numero valido'));
                }
                const validacoes = yield UsuarioRepository_1.default.validacoes(Object.assign({ idUser: parseInt(req.params.id, null) }, body), true);
                if (validacoes.length > 0) {
                    return res.status(400)
                        .json(Retorno_1.default.Sucesso(true, [...validacoes], 'O cadastro não passou em algumas validações'));
                }
                yield UsuarioRepository_1.default.update(Object.assign({ idUser: parseInt(req.params.id, null) }, body));
                return res.status(201)
                    .json(Retorno_1.default.Sucesso(true, [], 'Usuario atualizado com sucesso'));
            }
            catch (error) {
                return res.status(400)
                    .json(Retorno_1.default.Sucesso(false, [], 'Erro ao realizar atualização'));
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (util_1.isNumber(req.params.id)) {
                    return res.status(400).json(Retorno_1.default.Sucesso(false, [], 'Parametro passando não e um numero valido'));
                }
                yield UsuarioRepository_1.default.delete(parseInt(req.params.id, null));
                return res.status(200)
                    .json(Retorno_1.default.Sucesso(true, [], 'Registro deletado com sucesso'));
            }
            catch (error) {
                return res
                    .status(400)
                    .json(Retorno_1.default.Sucesso(false, [], 'Erro ao deletar cadastro de usuario'));
            }
        });
    }
    readById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (util_1.isNumber(req.params.id)) {
                    return res.status(400).json(Retorno_1.default.Sucesso(false, [], 'Parametro passando não e um numero valido'));
                }
                const user = yield UsuarioRepository_1.default.readById(parseInt(req.params.id, null));
                return res.status(200)
                    .json(Retorno_1.default.Sucesso(true, [...user], ''));
            }
            catch (error) {
                return res.status(400)
                    .json(Retorno_1.default.Sucesso(false, [], 'Erro ao pesquisar usuario'));
            }
        });
    }
    read(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield UsuarioRepository_1.default.read();
                return res.status(200)
                    .json(Retorno_1.default.Sucesso(true, [...user], 'Lista de Usuario'));
            }
            catch (error) {
                return res.status(400)
                    .json(Retorno_1.default.Sucesso(false, [], 'Erro ao pesquisar lista de Usuarios'));
            }
        });
    }
    // Comando usuario admin
    cadastrarUsuarioGit(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const nome = req.params.nome;
                const result = yield axios_1.default.get(`https://api.github.com/users/${nome}`);
                const { login, name, bio, location, html_url } = result.data;
                const body = { login, name, bio, location, html_url };
                const validacoes = yield UsuariosGitRepository_1.default.validacoes(body);
                if (validacoes.length > 0) {
                    res.status(400)
                        .json(Retorno_1.default.Sucesso(true, [...validacoes], 'O cadastro não passou em algumas validações'));
                }
                yield UsuariosGitRepository_1.default.save(body);
                return res.status(200)
                    .json(Retorno_1.default.Sucesso(true, [], 'Usuario do github, inserido no banco de dados'));
            }
            catch (error) {
                return res.status(400)
                    .json(Retorno_1.default.Sucesso(false, [error], 'Ocorreu um erro ao pesquisar usuario no github, e inserir no banco de dados'));
            }
        });
    }
}
exports.default = new UsuarioController();
//# sourceMappingURL=UsuarioAdmin.js.map