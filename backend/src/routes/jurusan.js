let express = require('express')
let route = express.Router()
let jwt = require('jsonwebtoken')
let modelUsers = require('../models/Users')
let modelJurusan = require('../models/Jurusan')

route.post('/getall', (req,res) => {
	jwt.verify(req.body.token, req.body.secret, (err, token) => {
    	if(err){
    	    res.json({ error: '[!] Wrong Authorization' }) 
        }

        modelUsers.find({ username: token.username }, (err, users) => {
        	if(err){
        	    res.json({ error: '[!] Users not found' }) 
            }
            modelJurusan.find({}, (err, done) => {
                res.json(done)
            })
        }) 
    }) 
})

route.post('/get', (req,res) => {
	jwt.verify(req.body.token, req.body.secret, (err, token) => {
    	if(err){
    	    res.json({ error: '[!] Wrong Authorization' }) 
        }

        modelUsers.find({ username: token.username }, (err, users) => {
        	if(err){
        	    res.json({ error: '[!] Users not found' }) 
            }
            modelJurusan.findOne({ jurusan: req.body.jurusan }, (err, done) => {
                res.json(done)
            })
        }) 
    }) 
})

route.post('/add', (req,res) => {
    jwt.verify(req.body.token, req.body.secret, (err, token) => {
        if(err){
            res.json({ error: '[!] Wrong Authorization' }) 
        }

        modelUsers.find({ username: token.username }, (err, users) => {
            if(err){
                res.json({ error: '[!] Users not found' }) 
            }
            modelJurusan.insertMany({ jurusan: req.body.jurusan }, (err, done) => {
                res.json({ success: '[+] Successfully insert jurusan' })
            })
        }) 
    }) 
})

module.exports = route;
