const {Router} = require('express')
const userRouter = require('./user')
const productRouter = require('./product')
const orderRouter = require('./order')
const reviewRouter = require('./review')
const basketRouter = require('./basket')

const router = new Router()

router.use('/user', userRouter)
router.use('/product', productRouter)
router.use('/order', orderRouter)
router.use('/review', reviewRouter)
router.use('/basket', basketRouter)

module.exports = router