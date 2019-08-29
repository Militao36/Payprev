import config from './Config';
import Knex from 'knex';
const knex = Knex(config);

const finalizar = () => process.exit();

const createTables = async (drop: boolean) => {
    // tslint:disable-next-line: no-console
    console.log('\n===============================');
    if (drop) {
        try {
            await knex.schema.dropTable('users');
            // tslint:disable-next-line: no-console
            console.log('>>>> Tabela `users` dropada');
            return finalizar();
        } catch (error) {
            // tslint:disable-next-line: no-string-literal no-console
            console.log(error['sqlMessage'], '\n');
            return finalizar();
        }
    }

    const exists = await knex.schema.hasTable('users');
    if (!exists) {
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
        console.log('>>>> Tabelas criada');
        finalizar();
    }
    // tslint:disable-next-line: no-console
    console.log('\n>>> Todas tabelas já criadas\n');
    finalizar();
};

createTables(process.argv[2] === 'drop');
