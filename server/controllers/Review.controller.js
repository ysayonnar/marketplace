const {Review, User, Product} = require('../models/models')
const dbError = require('../middlewares/databaseErrorHandler')
const uuid = require('uuid')
const path = require('path')

const countRating = (reviews) =>{
    let averageRating = 0
    for (let i = 0; i < reviews.length; i += 1) {
        averageRating += reviews[i].rating
    }
    averageRating = averageRating / reviews.length
    return averageRating
}

class ReviewController{
    async getReviews(req,res){
        //свободный доступ
        try {
            const reviews = await Review.findAll({include: [User]})
            res.json({reviews})
        } catch (e) {
            dbError(res, e)
        }
    }
    
    async createReview(req,res){
        //закрытый доступ
        const {title, content, productId} = req.body
        const rating = parseInt(req.body.rating)
        if(!title || !content || !rating || !productId){
            return res.json({msg: 'all parametrs required'})
        }
        if(rating < 0 || rating > 5){
            return res.json({msg: 'rating must be from 0 to 5.'})
        }
        if(typeof(rating) != 'number'){
            return res.json({msg: 'rating must be a number'})
        }

        const userId = req.user.id
        let image_url

        const {image} = req.files
        if(image){
            image_url = uuid.v4() + '.jpg'
			image.mv(path.resolve(__dirname, '..', 'static', image_url))
        }
        else{
            image_url = null
        }

        try {
            const createdReview = await Review.create({title, content, rating, userId,productId, image_url})
            const reviews = await Review.findAll({where: {productId}})
            const averageRating = countRating(reviews)
            const updatedProduct = await Product.update({rating: averageRating}, {where: {id: productId}})
            res.json({createdReview})
        } catch (e) {
           dbError(res, e)
        }
    }

    async deleteReview(req,res){
        //закрытый доступ
        const reviewId = req.body.id
        if(!reviewId){
            return res.json({msg: 'review identoficator required.'})
        }
        try {
            const deletedReview = await Review.destroy({where: {id: reviewId}})
            res.json({deletedReview})
        } catch (e) {
            dbError(res, e)
        }
    }
}

module.exports = new ReviewController()