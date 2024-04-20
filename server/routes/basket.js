const { Router } = require('express')
const router = new Router()
const authMiddleware = require('../middlewares/authMiddleware')
const controller = require('../controllers/Basket.controller')

router.get('/items', authMiddleware, controller.getBasketItems)
router.post('/append/:id', authMiddleware, controller.createBusketItem)
router.delete('/delete/:id', authMiddleware, controller.deleteBusketItem)

module.exports = router