/**
 * Aqui é a parte de configução de dados no arquivo .env.
 * Neste aquivo, quando iniciado o app, ele faz uma verificação
 * para saber se todos os dados em ambiente de desenvolvimento
 * foi informado corretamente.
 */

require('dotenv').config()
const { z } = require('zod')

const envSchema = z.object({
    DB_USER: z.string(),
    DB_HOST: z.string(),
    DB_NAME: z.string(),
    DB_PASS: z.string(),
    DB_PORT: z.string(),
    LOCAL_PORT: z.string()
})

module.exports = envSchema.parse(process.env)