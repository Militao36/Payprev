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
const ValidaCpf_1 = __importDefault(require("../Utils/ValidaCpf"));
const email_validator_1 = require("email-validator");
class UsuarioRepository {
    constructor() {
        this.userEmailExists = (email, update) => __awaiter(this, void 0, void 0, function* () {
            const user = yield this.readByEmail(email);
            if (!update) {
                return user.length > 0 ? true : false;
            }
            else {
                return user;
            }
        });
        this.userCpfExists = (cpf, update) => __awaiter(this, void 0, void 0, function* () {
            const user = yield this.readByCpf(cpf);
            if (!update) {
                return user.length > 0 ? true : false;
            }
            else {
                return user;
            }
        });
    }
    save(usuario) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield ConfigDb_1.default('users')
                .insert(usuario);
            return [Object.assign({ idUser: user[0], senha: '***' }, usuario)];
        });
    }
    update(usuario) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield ConfigDb_1.default('users')
                .update(usuario)
                .where('idUser', '=', usuario.idUser);
            return user === -1 ? false : true;
        });
    }
    delete(idUser) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield ConfigDb_1.default('users')
                .delete()
                .where('idUser', '=', idUser);
            return user === -1 ? false : true;
        });
    }
    readById(idUser) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield ConfigDb_1.default
                .select('idUser', 'email', 'cpf', 'tipoUsuario')
                .table('users')
                .where('idUser', '=', idUser);
            return user;
        });
    }
    readByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield ConfigDb_1.default
                .select('idUser', 'email', 'cpf', 'tipoUsuario', 'senha')
                .table('users')
                .where('email', '=', email);
            return user;
        });
    }
    readByCpf(cpf) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield ConfigDb_1.default
                .select('idUser', 'email', 'cpf', 'tipoUsuario')
                .table('users')
                .where('cpf', '=', cpf);
            return user;
        });
    }
    read() {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield ConfigDb_1.default
                .select('idUser', 'email', 'cpf', 'tipoUsuario')
                .table('users');
            return user;
        });
    }
    validacoes(usuario, update) {
        return __awaiter(this, void 0, void 0, function* () {
            const erros = [];
            if (!ValidaCpf_1.default(usuario.cpf)) {
                erros.push('Cpf invalido, favor passar um cpf valido para realizar o cadastro');
            }
            if (!email_validator_1.validate(usuario.email)) {
                erros.push('Email não e valido, favor passar um e-mail valido');
            }
            if (update) {
                const exits = yield this.userEmailExists(usuario.email, true);
                if (exits[0].idUser !== usuario.idUser) {
                    erros.push('Usuario já cadastro com esse email');
                }
            }
            else {
                if (yield this.userEmailExists(usuario.email, false)) {
                    erros.push('Usuario já cadastro com esse email');
                }
            }
            if (update) {
                const exits = yield this.userCpfExists(usuario.cpf, true);
                if (exits[0].idUser !== usuario.idUser) {
                    erros.push('Já tem um usuário cadastrado com esse cpf');
                }
            }
            else {
                if (yield this.userCpfExists(usuario.cpf, false)) {
                    erros.push('Já tem um usuário cadastrado com esse cpf');
                }
            }
            if (usuario.senha.length < 6) {
                erros.push('A senha deve ser mais ou igual a 6 caracteres');
            }
            // Ahh coloquei desse jeito pq com || dava um erro no tslint, funcionou então pode deixar assim
            if (usuario.tipoUsuario !== 'ADMIN') {
                if (usuario.tipoUsuario !== 'COMUM') {
                    erros.push('O tipo de usuario passado e inválido!');
                }
            }
            return erros;
        });
    }
}
exports.default = new UsuarioRepository();
//# sourceMappingURL=UsuarioRepository.js.map