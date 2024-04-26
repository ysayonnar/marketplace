const {User} = require('../models/models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const dbError = require('../middlewares/databaseErrorHandler')

const checkEmail = (email) => {
    if(!email.includes('@')){
        return false
    }else{
        return true
    }
}

const generateJwt = (id, email, role, username) => {
    return jwt.sign({id, email, role, username}, process.env.SECRET_KEY,{
        expiresIn: '24h'
    })
}

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
            dbError(res, e)
        }
    }
    
    async registration(req,res) {
        try {
            const {email, password, username, role} = req.body
            
            //validation stage
            if(!email || !password || !username){
                return res.json({ msg: 'All parameters are required' })
            }
            if(!checkEmail(email)){
                return res.json({ msg: 'The email sent is not valid' })
            }
            const candidate = await User.findOne({where: {email}})
            if(candidate){
                return res.json({msg: 'User with this email already exists.'})
            }
            const hasPassword = await bcrypt.hash(password, 5)
            const user = await User.create({email, password: hasPassword, username, role})
            const token = generateJwt(user.id, user.email, user.role, user.username)
            res.status(200).json({ token, msg: 'Successfully registered' })
        } catch (e) {
            dbError(res, e)
        }
    }

    async login(req,res){
        try {
            const {email, password} = req.body
            //validation stage
            if(!email || !password){
                return res.json({ msg: 'All parameters are required' })
            }
            if(!checkEmail(email)){
                return res.json({ msg: 'The email sent is not valid' })
            }

            const user = await User.findOne({where: {email}})
            const comparePassword = bcrypt.compareSync(password, user.password)
            if(!comparePassword){
                return res.json({ msg: 'Incorrect password' })
            }
            const token= generateJwt(user.id, user.email, user.role, user.username)
            res.json({token})
        } catch (e) {
            dbError(res, e)
        }
    }


    async auth(req,res){
        const user = req.user
        res.json({user})
    }
}

module.exports = new UserController()