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
const ListasUserGit_1 = __importDefault(require("../Repositories/ListasUserGit"));
const Retorno_1 = __importDefault(require("../Utils/Retorno"));
const util_1 = require("util");
const UsuarioRepository_1 = __importDefault(require("../Repositories/UsuarioRepository"));
class UsuarioComumController {
    // Listagem usuarios github
    getAllUserGit(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield UsuarioRepository_1.default.read();
                return res.status(200)
                    .json(Retorno_1.default.Sucesso(true, [...user], 'Lista de Usuarios'));
            }
            catch (error) {
                return res.status(400)
                    .json(Retorno_1.default.Sucesso(false, [], 'Erro ao pesquisar lista de Usuarios'));
            }
        });
    }
    criarLista(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { nameLista } = req.body;
                const lista = yield ListasUserGit_1.default.getListaExist(nameLista);
                if (lista) {
                    yield ListasUserGit_1.default.createLista({ nameLista });
                    return res
                        .status(201).json(Retorno_1.default.Sucesso(true, [], 'Lista criada com sucesso'));
                }
                return res
                    .status(400).json(Retorno_1.default.Sucesso(true, [], 'Já tem uma lista cadastrada com esse nome'));
            }
            catch (error) {
                return res.status(400)
                    .json(Retorno_1.default.Sucesso(false, [], 'Erro ao criar lista'));
            }
        });
    }
    updateLista(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { nameLista } = req.body;
                if (util_1.isNumber(req.params.id)) {
                    return res.status(400)
                        .json(Retorno_1.default.Sucesso(false, [], 'Parametro passando não e um numero valido'));
                }
                yield ListasUserGit_1.default.updateLista({ idLista: parseInt(req.params.id.toString(), null), nameLista });
                return res
                    .status(201).json(Retorno_1.default.Sucesso(true, [], 'Lista atualizada com sucesso'));
            }
            catch (error) {
                return res.status(400)
                    .json(Retorno_1.default.Sucesso(false, [], 'Ocorrreu um erro ao atualizar a lista'));
            }
        });
    }
    deletLista(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (util_1.isNumber(req.params.id)) {
                    return res.status(400).json(Retorno_1.default.Sucesso(false, [], 'Parametro passando não e um numero valido'));
                }
                yield ListasUserGit_1.default.deleteLista(parseInt(req.params.id, null));
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
    // adicionar, remover lista
    addUserLista(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { lista, usuario } = req.body;
                const result = yield ListasUserGit_1.default.addUserLista(lista, usuario);
                return res
                    .status(201).json(Retorno_1.default.Sucesso(true, [], result.toUpperCase()));
            }
            catch (error) {
                return res.status(400)
                    .json(Retorno_1.default.Sucesso(false, [], 'Ocorreu um erro ao adicionar usuario na lista'));
            }
        });
    }
    deleteUserLista(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { lista, usuario } = req.body;
                const result = yield ListasUserGit_1.default.deleteUserLista(lista, usuario);
                return res
                    .status(201).json(Retorno_1.default.Sucesso(true, [], result.toUpperCase()));
            }
            catch (error) {
                return res.status(400)
                    .json(Retorno_1.default.Sucesso(false, [], 'Ocorreu um erro ao excluir usuario na lista'));
            }
        });
    }
    addTags(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { lista, usuario, tags } = req.body;
                const result = yield ListasUserGit_1.default.addTags(lista, usuario, tags.split(','));
                return res
                    .status(201).json(Retorno_1.default.Sucesso(true, [], result.toUpperCase()));
            }
            catch (error) {
                return res.status(400)
                    .json(Retorno_1.default.Sucesso(false, [error], 'Ocorreu um erro ao adicionar tags no usuário'));
            }
        });
    }
    removeTags(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { lista, usuario } = req.body;
                const result = yield ListasUserGit_1.default.removeTags(lista, usuario, []);
                return res
                    .status(201).json(Retorno_1.default.Sucesso(true, [], result.toUpperCase()));
            }
            catch (error) {
                return res.status(400)
                    .json(Retorno_1.default.Sucesso(false, [error], 'Ocorreu um erro ao deletar tags no usuário'));
            }
        });
    }
    getListas(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield ListasUserGit_1.default.getListaCadastradas();
                return res
                    .status(201).json(Retorno_1.default.Sucesso(true, result, 'Lista de todas as listas'));
            }
            catch (error) {
                return res.status(400)
                    .json(Retorno_1.default.Sucesso(false, [], 'Ocorreu um erro ao pesquisar lista'));
            }
        });
    }
    getListaCompleta(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield ListasUserGit_1.default.getListas();
                return res
                    .status(201).json(Retorno_1.default.Sucesso(true, result, 'Lista de todas as listas'));
            }
            catch (error) {
                return res.status(400)
                    .json(Retorno_1.default.Sucesso(false, [], 'Ocorreu um erro ao gerar lista completa'));
            }
        });
    }
}
exports.default = new UsuarioComumController();
//# sourceMappingURL=UsuarioComum.js.map