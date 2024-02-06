const express = require('express')
const app = express()

//Routes
const clientsRoutes = require('./src/routes/clients.routes')

app.use(express.json())

app.use([clientsRoutes])

module.exports = app