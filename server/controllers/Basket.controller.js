const {Basket} = require('../models/models')
const dbError = require('../middlewares/databaseErrorHandler')

class BasketController{
    async getBasketItems(req,res){
        //закрытый доступ
        const userId = req.user.id

        try {
            const items = await Basket.findAll({where: {userId}})
            res.json({items})
        } catch (e) {
            dbError(res, e)
        }
    }

    async createBusketItem(req,res){
        //закрытый доступ
        const userId = req.user.id
        const productId = parseInt(req.params.id)
        if(typeof(productId) != 'number'){
            return res.json({msg: 'id must be a number.'})
        }
        try {
            const createdItem = await Basket.create({userId, productId})
            res.json({createdItem})
        } catch (e) {
            dbError(res, e)
        }
    }
    
    async deleteBusketItem(req,res){
        //закрытый доступ
        const productId = parseInt(req.params.id)
        if(typeof(productId) != 'number'){
            return res.json({msg: 'id must be a number.'})
        }
        try {
            const deleted = await Basket.destroy({where: {productId}})
            res.json({deleted})
        } catch (e) {
            dbError(res,e)
        }
    }
}

module.exports = new BasketController()