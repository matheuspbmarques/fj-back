const client = require('../configs/client')

class ClientsRepository{
    async store(name, email, phone, coordinateX, coordinateY){
        await client.query(`
            INSERT INTO clients(
                name, email, phone, coordinate_x, coordinate_y
            ) VALUES (
                $1, $2, $3, $4, $5
            )
        `, [name, email, phone, coordinateX, coordinateY])
    }

    /**
     * Procura todos os clientes segundo os filtros passados
     * @param {Array<{
     *      column: string,
     *      value: string
     * }>} filters 
     * @returns 
     */
    async findAll(filters){
        let filterQuery = ''

        /**
         * Se não for passado nada no filtro a função map não é executada
         * assim evitando erros.
         * */
        filters?.map(({ column, value }) => {
            filterQuery +=
            value
            ?
                column == 'name' || column == 'email'
                ?
                    filterQuery == ''
                    ?
                    `WHERE ${column} ILIKE '%${value}%'`
                    :
                    ` AND ${column} ILIKE '%${value}%'`
                :
                filterQuery == ''
                    ?
                    `WHERE ${column} = '${value}'`
                    :
                    ` AND ${column} = '${value}'`
            : ''
        })

        const query = `
            SELECT
                *
            FROM
                clients
            ${filterQuery}
        `

        return (await client.query(query)).rows
    }
}

module.exports = new ClientsRepository