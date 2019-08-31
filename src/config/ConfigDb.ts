import knex from 'knex';

export default knex({
    client: 'mysql',
    connection: {
        host: '127.0.0.1',
        user: process.env.USER,
        password: process.env.SENHA,
        database: 'payprev',
    },
});
