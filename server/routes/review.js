const { Router } = require('express')
const router = new Router()
const controller = require('../controllers/Review.controller')
const authMiddleware = require('../middlewares/authMiddleware')

router.get('/all', controller.getReviews)
router.post('/create', authMiddleware, controller.createReview)
router.delete('/delete', authMiddleware, controller.deleteReview)

module.exports = router
