const { z } = require('zod')
const verification = require('../tools/verification')
const ClientsRepository = require('../repository/ClientsRepository')
const utm = require('utm')

const createBodySchema = z.object({
    name: z.string(),
    email: z.string().email('O email informado não está correta, verifique e tente novamente'),
    phone: z.string(),
    coordinateX: z.string(),
    coordinateY: z.string()
})

class ClientsControllers{
    async create(req, res){
        const { name, email, phone, coordinateX, coordinateY } = req.body

        const parseResult = createBodySchema.safeParse(req.body)

        if(!parseResult.success){
            console.error(`[Error at body request]: ${parseResult.error.message}`)

            return res.status(400).json({
                error: 'DATA-WRONG',
                message: 'Os dados informados não estão corretos, verifique e tente novamente.'
            })
        }

        if(!verification.phone(phone)){
            return res.status(400).json({
                error: 'PHONE-WRONG',
                message: 'O telefone informado não está correto, verifique e tente novamente'
            })
        }

        if(!coordinateX || !coordinateY){
            return res.status(400).json({
                error: 'COORDINATE-WRONG',
                message: 'As coordenadas informadas estão erradas.'
            })
        }

        await ClientsRepository.store(name, email, phone, coordinateX, coordinateY)

        res.status(201).end('Client created successfully')
    }

    async getAll(req, res){
        const { name, email, phone } = req.query

        const clients = await ClientsRepository.findAll([
            {
                column: 'name',
                value: name
            },
            {
                column: 'email',
                value: email
            },
            {
                column: 'phone',
                value: phone
            }
        ])

        return res.json(clients)
    }

    async getAllRouter(req, res){
        /**
         * Local da empresa:
         * Business 316 - BR316
        */
        const startUtm = utm.fromLatLon(-1.3696467605166314, -48.37931530384497)

        const clients = await ClientsRepository.findAll()

        /**
         * clientId
         * distance
         */
        const visitOrder = []

        for(const client of clients){
            const clientUtm = utm.fromLatLon(parseFloat(client.coordinate_x), parseFloat(client.coordinate_y))

            const subE = startUtm.easting - clientUtm.easting
            const subN = startUtm.northing - clientUtm.northing

            const powE = Math.pow(subE, 2)
            const powN = Math.pow(subN, 2)

            // Distância entre o local da empresa para os clientes em Km
            const calc = Math.sqrt(powE + powN) / 1000

            // Verifica se o cliente atual é o mais próximo
            const result = visitOrder.some((visit, i) => {

                // Se o cliente atual é o mais próximo
                if(calc < visit.distance){

                    // Insere o cliente na frente
                    visitOrder.splice(i, 0, {
                        clientId: client.id,
                        distance: calc
                    })

                    return true
                }
            })

            // Se o cliente atual não for o mais próximo do que todos, então adiciona no final
            if(!result){
                visitOrder.push({
                    clientId: client.id,
                    distance: calc
                })
            }
        }

        const clientsOrdinate = visitOrder.map(visit => clients.find(client => client.id == visit.clientId))

        res.json(clientsOrdinate)
    }
}

module.exports = new ClientsControllers