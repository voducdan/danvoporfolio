const express = require('express')
const router = express.Router()
const jsonwebtoken = require('jsonwebtoken')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const posts = require('../model/post')
const users = require('../model/users')

router.get('/:username/posts', async (req, res) => {
    if (req.headers.authorization) {
        const decode = await jsonwebtoken.decode(req.headers.authorization)
        await posts.find({ author: req.params.username }, (err, data) => {
            if (err) {
                res.send(err)
                res.status(400)
                res.end()
                return
            }
            if (data.length === 0) {
                res.status(404)
                return
            }
            users.find({ email: decode.email }, (err, response) => {
                if (response.length === 0) {
                    res.status(404)
                    return
                }
                res.status(200).json({
                    userposts: data
                })
            })
        })
    }

})
module.exports = router