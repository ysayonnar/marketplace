const { Router } = require('express')
const router = new Router()
const controller = require('../controllers/Order.controller')
const authMiddleware = require('../middlewares/authMiddleware')

router.get('/all', authMiddleware, controller.getOrdersByUser)
router.post('/create',authMiddleware, controller.createOrder)
router.put('/setCompleted/:id', authMiddleware, controller.setOrderCompleted)
router.delete('/delete/:id', authMiddleware, controller.deleteOrder)

module.exports = router
