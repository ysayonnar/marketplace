const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    username: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: 'USER'}
})

const Order = sequelize.define('order', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    products_list: {type: DataTypes.STRING},
    total_price: {type: DataTypes.STRING},
    isCompleted: {type: DataTypes.STRING},
})

const Product = sequelize.define('product', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: {type: DataTypes.STRING},
    description: {type: DataTypes.STRING},
    price: {type: DataTypes.INTEGER},
    image_url: {type: DataTypes.STRING},
    category: {type: DataTypes.STRING},
    rating: {type: DataTypes.FLOAT, defaultValue: 0}
})

const Review = sequelize.define('review', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: {type: DataTypes.STRING},
    content: {type: DataTypes.STRING},
    rating: {type: DataTypes.FLOAT},
})

User.hasMany(Order)
Order.belongsTo(User)

User.hasMany(Product)
Product.belongsTo(User)

User.hasMany(Review)
Review.belongsTo(User)

Product.hasMany(Review)
Review.belongsTo(Product)

module.exports ={
    User,
    Order,
    Product,
    Review
}