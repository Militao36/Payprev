import knex from 'knex';

export default knex({
    client: 'mysql',
    connection: {
        host: 'mysql669.umbler.com',
        user: 'payprev',
        password: 'payprev2019',
        database: 'payprev',
    },
});
