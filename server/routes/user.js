const {Router} = require('express')
const controller = require('../controllers/User.controller')
const router = new Router()
const authMiddleware = require('../middlewares/authMiddleware')

router.get('/', controller.getUsers)
router.post('/registration', controller.registration)
router.post('/login', controller.login)
router.get('/auth', authMiddleware, controller.auth)

module.exports = router