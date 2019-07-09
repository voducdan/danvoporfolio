const jsonwebtoken = require('jsonwebtoken')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const saltRound = 13
const posts = require('../model/post')
const users = require('../model/users')

module.exports = function (req, res, next) {
    const decode = jsonwebtoken.decode(req.headers.authorization)
    users.find({
        email: decode.email,
    }, (err, user) => {
        if (err) {
            res.status(401).json({
                err: 'Email does not match'
            })
            next()
        } else {
            bcrypt.compare(decode.password, user[0].password, (err, comapre) => {
                if (!comapre) {
                    res.status(401).json({
                        err: 'Password does not match'
                    })
                    next()
                }
            })
        }
    })
    next()
}