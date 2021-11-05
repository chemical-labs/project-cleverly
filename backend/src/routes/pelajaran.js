let express = require('express')
let route = express.Router()
let jwt = require('jsonwebtoken')
let modelUsers = require('../models/Users')
let modelPelajaran = require('../models/Pelajaran')

route.post('/getall', (req,res) => {
    jwt.verify(req.body.token, req.body.secret, (err, token) => {
	    if(err){
	        res.json({ error: '[!] Wrong Authorization' }) 
        }

        modelUsers.findOne({ username: token.username }, (err, users) => {
	        if(err){
                res.json({ error: '[!] Users not found' }) 
            }else{
                modelPelajaran.find({}, (err, done) => {
                    res.json(done)
                })
            }

        })
    })
})

route.post('/search', (req,res) => {
    jwt.verify(req.body.token, req.body.secret, (err, token) => {
        if(err){
            res.json({ error: '[!] Wrong Authorization' }).status(301)
        }

        modelUsers.find({ username: token.username }, (err, user) => {
            if(err){
                res.json({ error: '[!] Wrong Authorization' })
            }

            modelPelajaran.find({ nama: { $regex: req.body.name } }, (err, done) => {
                res.json(done)
            })
        })
    })
})

route.post('/get', (req,res) => {
    jwt.verify(req.body.token, req.body.secret, (err, token) => {
	    if(err){
	        res.json({ error: '[!] Wrong Authorization' }) 
        }else{
            modelUsers.findOne({ username: token.username }, (err, users) => {
    	        if(err){
                    res.json({ error: '[!] Users not found' }) 
                }else{
                    modelPelajaran.find({ jurusan: req.body.jurusan }, (err, done) => {
                        res.json(done)
                    })
                }
            })
        }
    })
})


route.post('/add', (req,res) => {
    jwt.verify(req.body.token, req.body.secret, (err, token) => {
	    if(err){
	        res.json({ error: '[!] Wrong Authorization' }) 
        }

        modelUsers.findOne({ username: token.username }, (err, users) => {
	        if(err){
                res.json({ error: '[!] Users not found' }) 
            }else{
                try{
                    req.files.img.mv('public/pelajaran/' + req.files.img.name, (err, gambar) => {
                        if(err){
                            res.json({ error: '[!] Error uploading image' })
                        }else{
                            modelPelajaran.insertMany({ jurusan: req.body.jurusan, nama: req.body.nama, gambar: 'http://' + req.headers.host + '/pelajaran/' + req.files.img.name }, (err, done) => {
                                res.json({ success: '[+] Success insert data' })
                            })
                        }


                    })

                }catch(e){

                }

            }
        })
    })
})

module.exports = route
