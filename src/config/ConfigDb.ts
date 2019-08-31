import knex from 'knex';

export default knex({
    client: 'mysql',
    connection: {
        host: 'mysql669.umbler.com',
        user: 'buiatchaka',
        password: 'buiatchaka2vezes',
        database: 'payprev',
    },
});
