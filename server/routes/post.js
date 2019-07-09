const express = require('express')
const router = express.Router()
const jsonwebtoken = require('jsonwebtoken')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const saltRound = 13
const posts = require('../model/post')
const users = require('../model/users')
const checkAuth = require('../middleware/checkauth')

router.post('/adminlogin', (req, res) => {
    users.find({
        email: req.body.email,
    }, (err, user) => {
        if (err) {
            res.status(401).json({
                jwt: null,
                err: 'Email does not match'
            })
        } else {
            bcrypt.compare(req.body.password, user[0].password, (err, comapre) => {
                if (!comapre) {
                    res.status(401).json({
                        jwt: null,
                        err: 'Password does not match'
                    })
                    return
                }
                const token = jsonwebtoken.sign({
                    email: req.body.email,
                    password: req.body.password
                }, 'eslint')
                res.status(200).json({
                    jwt: token,
                    username: user[0].username
                })
            })
        }
    })
})

router.post('/addnew', (req, res) => {
    const newPost = new posts(req.body)
    newPost.save((err) => {
        if (err) {
            console.log(err)
        }
    })
})

router.get('/getposts', async (req, res) => {
    let allPost = await posts.find({}, (err, data) => {
        if (err) {
            console.log(err)
            return null
        }
        else {
            return data
        }
    })
    await res.status(200).json({
        posts: allPost
    })
})
router.get('/:linktopost', (req, res) => {
    const _id = mongoose.Types.ObjectId(req.params.linktopost)
    posts.find({ _id: _id }, (err, data) => {
        if (err) {
            console.log(err)
            res.status(404).json({
                data: 'Post not found'
            })
            return
        }
        res.status(200).json({
            data: data
        })
    })
})

router.get('/edit/:postid', (req, res) => {
    const _id = mongoose.Types.ObjectId(req.params.postid)
    posts.find({ _id: _id }, (err, data) => {
        if (err) {
            res.json({
                err: 'Can not find this post'
            })
            return
        }
        res.json({
            text: data[0],
        })
    })
})
router.post('/edit/:postid', (req, res) => {
    const _id = mongoose.Types.ObjectId(req.params.postid)
    const update = req.body
    posts.findOneAndUpdate({ _id: _id }, update, { new: true }, (err) => {
        if (err) {
            console.log(err)
        }

    })
})
router.delete('/delete/:postid', checkAuth, (req, res) => {
    const _id = mongoose.Types.ObjectId(req.params.postid)
    posts.findOneAndDelete({ _id: _id }, (err) => {
        if (err) {
            res.status(400).json({
                err: err
            })
            return
        }
        posts.find({}, (err, data) => {
            res.status(200).json({
                posts: data
            })
        })
    })
})









module.exports = router