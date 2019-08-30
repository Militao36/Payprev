import { UserGit } from '../interfaces/UserGit';
import knex from '../config/ConfigDb';
import { isNumber } from 'util';

class UsuarioGit {
    public async save(user: UserGit): Promise<boolean> {
        const userGit = await knex('userGit')
            .insert(user);
        return isNumber(parseInt(userGit[0].toString(), null));
    }

    public async update(user: UserGit): Promise<boolean> {
        const userGit = await knex('userGit')
            .update(user)
            .where('idUserGit', '=', user.idUserGit);
        return userGit === -1 ? false : true;
    }

    public async delete(idUserGit: number): Promise<boolean> {
        const user = await knex('userGit')
            .delete()
            .where('idUserGit', '=', idUserGit);
        return user === -1 ? false : true;
    }

    public async readByLogin(login: string): Promise<UserGit[]> {
        const user = await knex
            .select<UserGit[]>()
            .table('userGit')
            .where('login', '=', login);
        return user;
    }

    public async read(): Promise<UserGit[]> {
        const user = await knex
            .select<UserGit[]>()
            .table('userGit');
        return user;
    }

    public async validacoes(user: UserGit): Promise<string[]> {
        const erros: string[] = [];
        const userExists = await this.readByLogin(user.login);
        if (userExists.length > 0) {
            erros.push('Esse usuário do github já está cadastrado');
        }
        return erros;
    }
}

export default new UsuarioGit();
