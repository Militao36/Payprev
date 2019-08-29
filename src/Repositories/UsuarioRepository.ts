import { Usuario } from '../interfaces/Usuario.interface';
import knex from '../config/ConfigDb';

class UsuarioRepository {
    public async save(usuario: Usuario): Promise<Usuario[]> {
        const user = await knex('user')
            .insert(usuario);
        return [{ idUser: user[0], ...usuario }];
    }

    public async update(usuario: Usuario): Promise<boolean> {
        const user = await knex('user')
            .update(usuario)
            .where('idUser', '=', usuario.idUser);
        return user === -1 ? false : true;
    }

    public async delete(idUser: number): Promise<boolean> {
        const user = await knex('user')
            .delete()
            .where('idUser', '=', idUser);
        return user === -1 ? false : true;
    }

    public async readById(idUser: number): Promise<Usuario[]> {
        const user = await knex
            .select<Usuario[]>()
            .table('user')
            .where('idUser', '=', idUser);
        return user;
    }

    public async readByEmail(email: string): Promise<Usuario[]> {
        const user = await knex
            .select<Usuario[]>()
            .table('user')
            .where('email', '=', email);
        return user;
    }

    public async read(): Promise<Usuario[]> {
        const user = await knex
            .select<Usuario[]>()
            .table('user');
        return user;
    }
}

export default new UsuarioRepository();
