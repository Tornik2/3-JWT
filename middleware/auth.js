const jwt = require('jsonwebtoken')
const CustomAPIError = require('../errors/custom-error')

const auth = async (req, res, next) => {
    const authHeader = req.headers.authorization
    if(!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new CustomAPIError('no token provided', 401)
    }

    const token = authHeader.split(' ')[1]
    try {
        const decoded = await jwt.verify(token, process.env.SECRET_JWT)
        const {user, id} = decoded
        req.user = {user, id}
        next()
    } catch (error) {
        throw new CustomAPIError('Not Authorized', 401)
    }
}

module.exports = auth