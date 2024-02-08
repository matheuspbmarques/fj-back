const express = require('express')
const app = express()
const cors = require('cors')

//Routes
const clientsRoutes = require('./src/routes/clients.routes')

app.use(cors({
    origin: '*'
}))
app.use(express.json())

app.use([clientsRoutes])

module.exports = app