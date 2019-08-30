import knex from '../config/ConfigDb';
import { Lista } from '../interfaces/Lista.interface';
import { ListaUser, ListaUserAll } from '../interfaces/ListaUser.interface';
import { UserGit } from 'src/interfaces/UserGit';

class ListaUserGit {
    // metodos para criar, atualizar e deletar listas;
    public async createLista(lista: Lista): Promise<boolean> {
        const listaUser = await knex('lista')
            .insert(lista);
        return listaUser[0] !== -1 ? true : false;
    }

    public async updateLista(lista: Lista): Promise<boolean> {
        const listaUser = await knex('lista')
            .update(lista)
            .where('idLista', '=', lista.idLista);
        return listaUser === -1 ? false : true;
    }

    public async deleteLista(idLista: number): Promise<boolean> {
        const listaUser = await knex('lista')
            .delete()
            .where('idLista', '=', idLista);
        return listaUser === -1 ? false : true;
    }

    public async getListaCadastradas(): Promise<Lista[]> {
        const lista = await knex
            .select<Lista[]>()
            .table('lista');
        return lista;
    }

    // Metodos para adicionar usuarios na listas
    public async addUserLista(nomeLista: string, login: string): Promise<string> {
        const getLista = await knex('lista')
            .select<Lista[]>()
            .where('nameLista', '=', nomeLista);

        const getUser = await knex('user_git')
            .select<UserGit[]>()
            .where('login', '=', login);

        if (getUser.length === 0) {
            return 'Usuario passado não existe';
        }
        if (getLista.length === 0) {
            return 'Está lista não existe';
        }

        const getUserLista = await knex('users_listas').select()
            .where('idUser', '=', getUser[0].idUserGit)
            .andWhere('idLista', '=', getLista[0].idLista);

        if (getUserLista.length > 0) {
            return 'Esse usuário já se encontra nesta lista';
        }

        const idLista = getLista[0].idLista;
        await knex('users_listas').insert({ idLista, idUser: getUser[0].idUserGit, tags: '' });
        return `Usuário adicionado na lista: ${getLista[0].nameLista}`;
    }

    public async deleteUserLista(nomeLista: string, login: string): Promise<string> {
        // abaixo irei realizar algumas verificações,
        // para ver se existe a lista e o usuarios passados;
        const getLista = await knex('lista')
            .select<Lista[]>()
            .where('nameLista', '=', nomeLista);

        const getUser = await knex('user_git')
            .select<UserGit[]>()
            .where('login', '=', login);

        if (getUser.length === 0) {
            return 'Usuario passado não existe';
        }

        if (getLista.length === 0) {
            return 'Está lista não existe';
        }

        const getUserLista = await knex('users_listas').select<ListaUser[]>()
            .where('idUser', '=', getUser[0].idUserGit)
            .andWhere('idLista', '=', getLista[0].idLista);

        if (getUserLista.length === 0) {
            return 'O usuário não existente na lista';
        }

        await await knex('users_listas')
            .delete()
            .where('idListaUser', '=', getUserLista[0].idListaUser);
        return 'Deletado com sucesso';
    }

    public async addTags(nomeLista: string, login: string, tags: string[]): Promise<string> {
        const getLista = await knex('lista')
            .select<Lista[]>()
            .where('nameLista', '=', nomeLista);

        const getUser = await knex('user_git')
            .select<UserGit[]>()
            .where('login', '=', login);

        if (getUser.length === 0) {
            return 'Usuario passado não existe';
        }

        if (getLista.length === 0) {
            return 'Está lista não existe';
        }

        const getUserLista = await knex('users_listas').select<ListaUser[]>()
            .where('idUser', '=', getUser[0].idUserGit)
            .andWhere('idLista', '=', getLista[0].idLista);

        if (getUserLista.length === 0) {
            return 'O usuário não existente na lista';
        }
        const tagsExist = getUserLista[0].tags.split(',');
        await knex('users_listas').update({ tags: [...tagsExist, ...tags].toString().substr(1) });
        return `${tags.length > 1 ? 'Tags adicionadas ao usuário' : 'Tag adicionada no usuário'} `;
    }

    public async removeTags(nomeLista: string, login: string, tags: string[]): Promise<string> {
        const getLista = await knex('lista')
            .select<Lista[]>()
            .where('nameLista', '=', nomeLista);

        const getUser = await knex('user_git')
            .select<UserGit[]>()
            .where('login', '=', login);

        if (getUser.length === 0) {
            return 'Usuario passado não existe';
        }

        if (getLista.length === 0) {
            return 'Está lista não existe';
        }

        const getUserLista = await knex('users_listas').select<ListaUser[]>()
            .where('idUser', '=', getUser[0].idUserGit)
            .andWhere('idLista', '=', getLista[0].idLista);

        if (getUserLista.length === 0) {
            return 'O usuário não existente na lista';
        }
        await knex('users_listas').update({ tags: '' });
        return `${tags.length > 1 ? 'Tags removidas' : 'Tag removida do usuario'} `;
    }

    public async getListas(): Promise<object> {
        const listas = {};
        const getLista = await knex.select<Lista[]>().table('lista');

        for (const item of getLista) {
            const getUser = await knex
                .from('users_listas')
                .select<ListaUserAll[]>()
                .innerJoin('user_git', 'users_listas.idUser', 'user_git.idUserGit')
                .where('users_listas.idLista', '=', item.idLista);
            const listaUser = [];
            getUser.forEach((v) => {
                if (v.idLista === item.idLista) {
                    listaUser.push({
                        [getUser[0].login]: { ...v },
                    });
                }
            });
            listas[item.nameLista] = listaUser;
        }
        return listas;
    }
}

export default new ListaUserGit();
