const {Router} = require('express')
const controller = require('../controllers/User.controller')
const router = new Router()

router.get('/', controller.getUsers)
router.post('/registration', controller.registration)
router.post('/login', controller.login)

module.exports = router