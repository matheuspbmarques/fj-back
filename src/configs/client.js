const { Client } = require('pg')
const env = require('../configs/env')

const client = new Client({
    user: env.DB_USER,
    host: env.DB_HOST,
    database: env.DB_NAME,
    password: env.DB_PASS,
    port: env.DB_PORT
})

client.connect()

module.exports = client