const { z } = require('zod')
const verification = require('../tools/verification')
const ClientsRepository = require('../repository/ClientsRepository')

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
}

module.exports = new ClientsControllers