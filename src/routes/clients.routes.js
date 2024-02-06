const { Router } = require('express')
const router = Router()
const ClientsControllers = require('../controllers/ClientsControllers')

router.post('/clients', ClientsControllers.create)
router.get('/clients', ClientsControllers.getAll)

module.exports = router