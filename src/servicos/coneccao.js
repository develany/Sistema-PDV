require('dotenv').config();

const knex = require('knex')({
    client: 'pg',
    connection: {
        host: String(process.env.DB_HOST),
        user: String(process.env.DB_USER),
        password: String(process.env.DB_PASS),
        database: String(process.env.DB_NAME)
    }
});

module.exports = knex;