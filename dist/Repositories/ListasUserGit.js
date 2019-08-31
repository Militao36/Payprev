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
const ConfigDb_1 = __importDefault(require("../config/ConfigDb"));
class ListaUserGit {
    // metodos para criar, atualizar e deletar listas;
    createLista(lista) {
        return __awaiter(this, void 0, void 0, function* () {
            const listaUser = yield ConfigDb_1.default('lista')
                .insert(lista);
            return listaUser[0] !== -1 ? true : false;
        });
    }
    updateLista(lista) {
        return __awaiter(this, void 0, void 0, function* () {
            const listaUser = yield ConfigDb_1.default('lista')
                .update(lista)
                .where('idLista', '=', lista.idLista);
            return listaUser === -1 ? false : true;
        });
    }
    deleteLista(idLista) {
        return __awaiter(this, void 0, void 0, function* () {
            const listaUser = yield ConfigDb_1.default('lista')
                .delete()
                .where('idLista', '=', idLista);
            return listaUser === -1 ? false : true;
        });
    }
    getListaExist(nameLista) {
        return __awaiter(this, void 0, void 0, function* () {
            const lista = yield ConfigDb_1.default.select()
                .table('lista')
                .where('nameLista', '=', nameLista);
            if (lista.length === 0) {
                return true;
            }
            return false;
        });
    }
    getListaCadastradas() {
        return __awaiter(this, void 0, void 0, function* () {
            const lista = yield ConfigDb_1.default
                .select()
                .table('lista');
            return lista;
        });
    }
    // Metodos para adicionar usuarios na listas
    addUserLista(nomeLista, login) {
        return __awaiter(this, void 0, void 0, function* () {
            const getLista = yield ConfigDb_1.default('lista')
                .select()
                .where('nameLista', '=', nomeLista);
            const getUser = yield ConfigDb_1.default('user_git')
                .select()
                .where('login', '=', login);
            if (getUser.length === 0) {
                return 'Usuario passado não existe';
            }
            if (getLista.length === 0) {
                return 'Está lista não existe';
            }
            const getUserLista = yield ConfigDb_1.default('users_listas').select()
                .where('idUser', '=', getUser[0].idUserGit)
                .andWhere('idLista', '=', getLista[0].idLista);
            if (getUserLista.length > 0) {
                return 'Esse usuário já se encontra nesta lista';
            }
            const idLista = getLista[0].idLista;
            yield ConfigDb_1.default('users_listas').insert({ idLista, idUser: getUser[0].idUserGit, tags: '' });
            return `Usuário adicionado na lista: ${getLista[0].nameLista}`;
        });
    }
    deleteUserLista(nomeLista, login) {
        return __awaiter(this, void 0, void 0, function* () {
            // abaixo irei realizar algumas verificações,
            // para ver se existe a lista e o usuarios passados;
            const getLista = yield ConfigDb_1.default('lista')
                .select()
                .where('nameLista', '=', nomeLista);
            const getUser = yield ConfigDb_1.default('user_git')
                .select()
                .where('login', '=', login);
            if (getUser.length === 0) {
                return 'Usuario passado não existe';
            }
            if (getLista.length === 0) {
                return 'Está lista não existe';
            }
            const getUserLista = yield ConfigDb_1.default('users_listas').select()
                .where('idUser', '=', getUser[0].idUserGit)
                .andWhere('idLista', '=', getLista[0].idLista);
            if (getUserLista.length === 0) {
                return 'O usuário não existente na lista';
            }
            yield yield ConfigDb_1.default('users_listas')
                .delete()
                .where('idListaUser', '=', getUserLista[0].idListaUser);
            return 'Deletado com sucesso';
        });
    }
    addTags(nomeLista, login, tags) {
        return __awaiter(this, void 0, void 0, function* () {
            const getLista = yield ConfigDb_1.default('lista')
                .select()
                .where('nameLista', '=', nomeLista);
            const getUser = yield ConfigDb_1.default('user_git')
                .select()
                .where('login', '=', login);
            if (getUser.length === 0) {
                return 'Usuario passado não existe';
            }
            if (getLista.length === 0) {
                return 'Está lista não existe';
            }
            const getUserLista = yield ConfigDb_1.default('users_listas').select()
                .where('idUser', '=', getUser[0].idUserGit)
                .andWhere('idLista', '=', getLista[0].idLista);
            if (getUserLista.length === 0) {
                return 'O usuário não existente na lista';
            }
            const tagsExist = getUserLista[0].tags.split(',');
            yield ConfigDb_1.default('users_listas').update({ tags: [...tagsExist, ...tags].toString().substr(1) });
            return `${tags.length > 1 ? 'Tags adicionadas ao usuário' : 'Tag adicionada no usuário'} `;
        });
    }
    removeTags(nomeLista, login, tags) {
        return __awaiter(this, void 0, void 0, function* () {
            const getLista = yield ConfigDb_1.default('lista')
                .select()
                .where('nameLista', '=', nomeLista);
            const getUser = yield ConfigDb_1.default('user_git')
                .select()
                .where('login', '=', login);
            if (getUser.length === 0) {
                return 'Usuario passado não existe';
            }
            if (getLista.length === 0) {
                return 'Está lista não existe';
            }
            const getUserLista = yield ConfigDb_1.default('users_listas').select()
                .where('idUser', '=', getUser[0].idUserGit)
                .andWhere('idLista', '=', getLista[0].idLista);
            if (getUserLista.length === 0) {
                return 'O usuário não existente na lista';
            }
            yield ConfigDb_1.default('users_listas').update({ tags: '' });
            return `${tags.length > 1 ? 'Tags removidas' : 'Tag removida do usuario'} `;
        });
    }
    getListas() {
        return __awaiter(this, void 0, void 0, function* () {
            const listas = {};
            const getLista = yield ConfigDb_1.default.select().table('lista');
            for (const item of getLista) {
                const getUser = yield ConfigDb_1.default
                    .from('users_listas')
                    .select()
                    .innerJoin('user_git', 'users_listas.idUser', 'user_git.idUserGit')
                    .where('users_listas.idLista', '=', item.idLista);
                const listaUser = [];
                getUser.forEach((v) => {
                    if (v.idLista === item.idLista) {
                        listaUser.push({
                            [getUser[0].login]: Object.assign({}, v),
                        });
                    }
                });
                listas[item.nameLista] = listaUser;
            }
            return listas;
        });
    }
}
exports.default = new ListaUserGit();
//# sourceMappingURL=ListasUserGit.js.map