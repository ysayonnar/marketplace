const {User} = require('../models/models')
const bcrypt = require('bcrypt')

class UserController {
    async getUsers(req,res) {
        try {
            const id = req.query.id
            if(id){
                const user = await User.findOne({where: {id}})
                res.json(user)
            } else{
                const users = await User.findAll()
                res.json(users)
            }
            
        } catch (e) {
            res.status(500).json({msg: 'something went wrong.'})
        }
    }
    
    async registration(req,res) {
        try {
            const {email, password, username, role} = req.body
            const candidate = await User.findOne({where: {email}})
            if(candidate){
                return res.json({msg: 'User with this email already exists.'})
            }
            const hasPassword = await bcrypt.hash(password, 5)
            const user = await User.create({email, password: hasPassword, username, role})
            res.status(200).json(user)
        } catch (e) {
            res.status(500).json({ msg: 'something went wrong.' })
        }
    }

    async login(req,res){
        
    }
}

module.exports = new UserController()