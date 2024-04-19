const { Order } = require('../models/models')
const dbError = require('../middlewares/databaseErrorHandler')

class OrderController {
    async getOrdersByUser(req,res){
        //jwt required
        const userId = req.user.id
        try {
            const orders = await Order.findAll({where: {userId}})
            res.json(orders)
        } catch (e) {
            dbError(res, e)
        }
    }

    async createOrder(req,res){
        //jwt required
        const {products_list, total_price} = req.body
        const userId = req.user.id
        if(!products_list || !total_price){
            return res.json({msg: 'all parameters required.'})
        }
        try {
            const createdOrder = await Order.create({products_list, total_price, userId, isCompleted: false})
            res.json({createdOrder})
        } catch (e) {
            dbError(res, e)
        }
    }

    async setOrderCompleted(req,res){
        const id = parseInt(req.params.id)
        if(typeof(id) != 'number'){
            return res.json({msg: 'id must be a number.'})
        }
        try {
            const updated = await Order.update({isCompleted: true}, {where: {id}})
            res.json({deleted})
        } catch (e) {
            dbError(res, e)
        }
    }

    async deleteOrder(req,res){
        const id = parseInt(req.params.id)
        if(typeof(id) != 'number'){
            return res.json({msg: 'id must be a number.'})
        }
        try {
            const deleted = await Order.destroy({where: {id}})
            res.json({deleted})
        } catch (e) {
            dbError(res, e)
        }
    }
}

module.exports = new OrderController()
