const JWT = require('jsonwebtoken');
const userCollection = require('../models/user');
// const user= require('../models/user')

const requireSignIn = async (req, res, next) => {
    try {
        const decode = JWT.verify(req.headers.authorization, process.env.JWT_SECRET_KEY);
        req.user = decode;
        next()
    } catch (e) {
        console.log(e);
    }
}


// admin access

const isAdmin = async (req, res, next) => {
    try {
        const user = await userCollection.findById(req.user._id)
        if (user.role !== 1) {
            return res.status(401).send({
                success: false,
                message: "UnAutharized Access",

            })
            user.role
        }else {
            next();
        }
           
    } catch (e) {
        console.log(e)
        res.send({
            message: "error is admin middleware!"
        })
    }

}

module.exports = { requireSignIn, isAdmin }