const {User, Product} = require('../models/models')
const uuid = require('uuid')
const path = require('path');

class ProductController {
	async getProducts(req, res) {
		//свободный доступ(без user.id)
		try {
            const products = await Product.findAll()
            res.json(products)
        } catch (e) {
            res.status(500).json({ msg: 'Something went wrong.' })
        }
	}

	async getOneProduct(req, res) {
		//свободный доступ(без user.id)
		const id = parseInt(req.params.id)
		try {
			const product = await Product.findOne({ where: { id } })
			res.json({ product })
		} catch (e) {
			res.status(500).json({ msg: 'Something went wrong.' })
		}
	}

    //!!!оптимизировать ошибки, а то писать вот это в catch надоело, хардкодинг))

	async getUserProducts(req,res){
        const userId = req.user.id
		const products = await Product.findAll({where: {userId}})
		res.json(products)
    }

	async createProduct(req, res) {
        const {title, description, price, category} = req.body
        const userId = req.user.id

        const {image} = req.files
        let filename = uuid.v4() + '.jpg'
        image.mv(path.resolve(__dirname, '..', 'static', filename))

        try {
            const createdProduct = await Product.create({title, description, price, category,userId, image_url: filename})
            res.json({createdProduct})
        } catch (e) {
            res.status(500).json({ msg: 'Something went wrong.' })
        }
		//закрытый доступ(с user.id)
	}

	async updateProduct(req, res) {
		try {
			if (!req.body.id) {
				return res.send({ msg: 'empty parametrs' })
			}
			const id = req.body.id
			const userId = req.user.id
			const updated = await Product.update({ ...req.body }, { where: {userId, id} })
			res.json({ updated })
		} catch (e) {
			res.status(500).json({ msg: 'Something went wrong.' })
		}
	}

	async deleteProduct(req, res) {
		const userId = req.user.id
		const id = req.body.id
		if(!id){
			return res.send({msg: 'id required'})
		}
		const deleted = await Product.destroy({where: {id, userId}})
		return res.json({deleted})
	}
}

module.exports = new ProductController()