import knex from 'knex';

export default knex({
    client: 'mysql',
    connection: {
        host: 'localhost',
        user: 'root',
        password: 'Matheus@147sa',
        database: 'payprev',
    },
});
