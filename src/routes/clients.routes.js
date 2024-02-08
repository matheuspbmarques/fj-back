const { Router } = require('express')
const router = Router()
const ClientsControllers = require('../controllers/ClientsControllers')

router.post('/clients', ClientsControllers.create)
router.get('/clients', ClientsControllers.getAll)
router.get('/clients/routes', ClientsControllers.getAllRouter)

module.exports = router