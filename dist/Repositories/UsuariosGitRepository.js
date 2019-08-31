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
const util_1 = require("util");
class UsuarioGit {
    save(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const userGit = yield ConfigDb_1.default('user_git')
                .insert(user);
            return util_1.isNumber(parseInt(userGit[0].toString(), null));
        });
    }
    update(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const userGit = yield ConfigDb_1.default('user_git')
                .update(user)
                .where('idUserGit', '=', user.idUserGit);
            return userGit === -1 ? false : true;
        });
    }
    delete(idUserGit) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield ConfigDb_1.default('user_git')
                .delete()
                .where('idUserGit', '=', idUserGit);
            return user === -1 ? false : true;
        });
    }
    readByLogin(login) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield ConfigDb_1.default
                .select()
                .table('user_git')
                .where('login', '=', login);
            return user;
        });
    }
    read() {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield ConfigDb_1.default
                .select()
                .table('userGit');
            return user;
        });
    }
    validacoes(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const erros = [];
            const userExists = yield this.readByLogin(user.login);
            if (userExists.length > 0) {
                erros.push('Esse usuário do github já está cadastrado');
            }
            return erros;
        });
    }
}
exports.default = new UsuarioGit();
//# sourceMappingURL=UsuariosGitRepository.js.map