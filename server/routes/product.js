const { Router } = require('express')
const controller = require('../controllers/Product.Controller')
const router = new Router()
const authMiddleware = require('../middlewares/authMiddleware')

router.get('/', controller.getProducts)
router.get('/one/:id', controller.getOneProduct)
router.get('/byUser', authMiddleware, controller.getUserProducts)
router.post('/create', authMiddleware, controller.createProduct)
router.put('/update', authMiddleware, controller.updateProduct)
router.delete('/delete', authMiddleware, controller.deleteProduct)


module.exports = router
