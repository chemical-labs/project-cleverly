let express = require('express')
let route = express.Router()
let jwt = require('jsonwebtoken')
let modelUsers = require('../models/Users')

route.post('/example', (req,res) => {
    jwt.verify(req.body.token, req.body.secret, (err, token) => {
        if(err){
            res.json({ error: '[!] Wrong Authorization' }) 
        }

        modelUsers.find({ username: token.username }, (err, users) => {
            if(err){
                res.json({ error: '[!] Users not found' }) 
            }
        })
    })
})

module.exports = route;
