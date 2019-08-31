import { Usuario } from '../interfaces/Usuario.interface';
import knex from '../config/ConfigDb';
import ValidaCpf from '../Utils/ValidaCpf';
import { validate } from 'email-validator';

class UsuarioRepository {
    public async save(usuario: Usuario): Promise<Usuario[]> {
        const user = await knex('users')
            .insert(usuario);
        return [{ idUser: user[0], senha: '***', ...usuario }];
    }

    public async update(usuario: Usuario): Promise<boolean> {
        const user = await knex('users')
            .update(usuario)
            .where('idUser', '=', usuario.idUser);
        return user === -1 ? false : true;
    }

    public async delete(idUser: number): Promise<boolean> {
        const user = await knex('users')
            .delete()
            .where('idUser', '=', idUser);
        return user === -1 ? false : true;
    }

    public async readById(idUser: number): Promise<Usuario[]> {
        const user = await knex
            .select<Usuario[]>('idUser', 'email', 'cpf', 'tipoUsuario')
            .table('users')
            .where('idUser', '=', idUser);
        return user;
    }

    public async readByEmail(email: string): Promise<Usuario[]> {
        const user = await knex
            .select<Usuario[]>()
            .table('users')
            .where('email', '=', email);
        return user;
    }

    public async readByCpf(cpf: string): Promise<Usuario[]> {
        const user = await knex
            .select<Usuario[]>('idUser', 'email', 'cpf', 'tipoUsuario')
            .table('users')
            .where('cpf', '=', cpf);
        return user;
    }

    public async read(): Promise<Usuario[]> {
        const user = await knex
            .select<Usuario[]>('idUser', 'email', 'cpf', 'tipoUsuario')
            .table('users');
        return user;
    }

    public async validacoes(usuario: Usuario, update: boolean): Promise<string[]> {
        const erros: string[] = [];
        if (!ValidaCpf(usuario.cpf)) {
            erros.push('Cpf invalido, favor passar um cpf valido para realizar o cadastro');
        }
        if (!validate(usuario.email)) {
            erros.push('Email não e valido, favor passar um e-mail valido');
        }

        if (update) {
            const exits = await this.userEmailExists(usuario.email, true) as Usuario[];
            if (exits.length > 0) {
                if (exits[0].idUser !== usuario.idUser) {
                    erros.push('Usuario já cadastro com esse email');
                }
            }
        } else {
            if (await this.userEmailExists(usuario.email, false)) {
                erros.push('Usuario já cadastro com esse email');
            }
        }

        if (update) {
            const exits = await this.userCpfExists(usuario.cpf, true);
            if (exits[0].idUser !== usuario.idUser) {
                erros.push('Já tem um usuário cadastrado com esse cpf');
            }
        } else {
            if (await this.userCpfExists(usuario.cpf, false)) {
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
    }

    private userEmailExists = async (email: string, update: boolean): Promise<boolean | Usuario[]> => {
        const user = await this.readByEmail(email);
        if (!update) {
            return user.length > 0 ? true : false;
        } else {
            return user;
        }
    }

    private userCpfExists = async (cpf: string, update: boolean): Promise<boolean | Usuario[]> => {
        const user = await this.readByCpf(cpf);
        if (!update) {
            return user.length > 0 ? true : false;
        } else {
            return user;
        }

    }
}

export default new UsuarioRepository();
