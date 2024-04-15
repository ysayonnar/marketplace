const {Router} = require('express')
const authMiddleware = require('../middlewares/authMiddleware')
const userRouter = require('./user')
const productRouter = require('./product')
const orderRouter = require('./order')
const reviewRouter = require('./review')

const router = new Router()

router.use('/user', userRouter)
router.use('/product', productRouter)
router.use('/order', orderRouter)
router.use('/review', reviewRouter)

module.exports = router