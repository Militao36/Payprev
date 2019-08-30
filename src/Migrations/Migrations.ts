import config from './Config';
import Knex from 'knex';
const knex = Knex(config);

const finalizar = () => process.exit();

const createTables = async (drop: boolean) => {
    // tslint:disable-next-line: no-console
    console.log('\n===============================');
    if (drop) {
        try {
            const existsTableUsers = await knex.schema.hasTable('users');
            if (existsTableUsers) {
                await knex.schema.dropTable('users');
                // tslint:disable-next-line: no-console
                console.log('>>>> Tabela `users` dropada');
            }
            const existsTableUsersGit = await knex.schema.hasTable('userGit');
            if (existsTableUsersGit) {
                await knex.schema.dropTable('userGit');
                // tslint:disable-next-line: no-console
                console.log('>>>> Tabela `userGit` dropada');
            }
            return finalizar();
        } catch (error) {
            // tslint:disable-next-line: no-string-literal no-console
            console.log(error['sqlMessage'], '\n');
            return finalizar();
        }
    }

    // tslint:disable-next-line: no-console
    console.log('>>>> Tabela `users` não existe, estamos criando');
    await knex.schema.createTable('users', (table) => {
        table.increments('idUser').primary();
        table.string('email', 150).notNullable().unique();
        table.string('senha', 200).notNullable();
        table.string('cpf', 15).notNullable().unique();
        table.enum('tipoUsuario', ['ADMIN', 'COMUM']).notNullable();
    });
    // tslint:disable-next-line: no-console
    console.log('>>>> Tabela `userGit` não existe, estamos criando');
    await knex.schema.createTable('userGit', (table) => {
        table.increments('idUser').primary();
        table.string('login', 100).notNullable().unique();
        table.string('name', 200).notNullable();
        table.string('bio', 1000);
        table.string('location', 150);
        table.string('html_url', 200).notNullable();
    });
    // tslint:disable-next-line: no-console
    console.log('>>>> Tabelas criada');
    finalizar();
};

createTables(process.argv[2] === 'drop');
