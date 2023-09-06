const CustomAPIError = require("../errors/custom-error")
const jwt = require('jsonwebtoken')
const secretKey = process.env.SECRET_JWT

const login = async (req, res) => {
    const {username, password} = req.body
    if(!username || !password) {
        throw new CustomAPIError('Please Provide both username and password', 400)
    }

    const payload = {
        user: username,
        id: new Date().getDate()
    }
    const token = jwt.sign(payload, secretKey)
    
    res.status(200).json({msg: 'all good', token})
}

const dashboard = async (req, res) => {
    try {
        const secretNum = Math.floor(Math.random() * 100)
        return res.json({msg: `Hello ${req.user.user}`,secret: `secret number is ${secretNum}`})
    } catch (error) {
        throw new CustomAPIError(error, 401)
    }
}


module.exports = { login, dashboard }