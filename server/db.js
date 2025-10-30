const { Pool } = require('pg')

const pool = new Pool({
    user: 'postgres',            // your PostgreSQL username
    host: 'localhost',
    database: 'Zssutaze',        // your database name
    password: 'PetkossBoss',   // must be a string
    port: 5432
})

module.exports = pool