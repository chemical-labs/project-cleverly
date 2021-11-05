let express = require('express')
let route = express.Router()
const jwt = require('jsonwebtoken')
const modelUsers = require('../models/Users')
const modelUlangan = require('../models/Ulangan')

route.post('/getall', (req,res) => {
    jwt.verify(req.body.token, req.body.secret, (err, token) => {
        if(err){
            res.json({ error: "[!] Wrong Authorization" }).status(301)
        }else{
            modelUsers.find({ username: token.username }, (err, user) => {
                if(err){
                    res.json({ error: '[!] Users not found '}).status(301)
                }else{
                    modelUlangan.find({ pelajaran: req.body.pelajaran }, (err, done) => {
                        if(err){
                            res.json({ error: '[!] Ulangan Not Found' })
                        }else{
                            res.json(done)
                        }
                    })
                }
            })
        }
    })
})

route.post('/get/soal', (req,res) => {
    jwt.verify(req.body.token, req.body.secret, (err, token) => {
        if(err){
            res.json({ error: "[!] Wrong Authorization" }).status(301)
        }else{
            modelUsers.find({ username: token.username }, (err, user) => {
                if(err){
                    res.json({ error: '[!] Users not found '}).status(301)
                }else{
                    modelUlangan.find({ pelajaran: req.body.pelajaran }, (err, done) => {
                        if(done != undefined){
                            res.json(done[0].soal)
                        }else{
                            res.json({ error: '[!] Soal Not Found!' }).status(501)
                        }
                    })
                }
            })
        }
    })
})


route.post('/get/opsi', (req,res) => {
    jwt.verify(req.body.token, req.body.secret, (err, token) => {
        if(err){
            res.json({ error: "[!] Wrong Authorization" }).status(301)
        }else{
            modelUsers.find({ username: token.username }, (err, user) => {
                if(err){
                    res.json({ error: '[!] Users not found '}).status(301)
                }else{
                    modelUlangan.find({ pelajaran: req.body.pelajaran }, (err, done) => {
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
            res.json({ error: '[!] Wrong Authorization' }).status(301)
        }else{
            modelUsers.find({ username: token.username }, (err, user) => {
                if(err){
                    res.json({ error: '[!] Users not found' }).status(301)
                }else{
                    modelUlangan.find({ 
                        pelajaran: req.body.pelajaran,
                        soal: req.body.soal,
                    }, (err, done) => {
                        if(err){
                            req.files.icons.mv('public/ulangan/' + req.files.icons.name, (err, img) => {
                                modelUlangan.insertMany({ 
                                    pelajaran: req.body.pelajaran,
                                    icons: 'http://' + req.headers.host + '/ulangan/' + req.files.icons.name,
                                    description: req.body.description,
                                    waktu: req.body.waktu
                                }, (err, done) => {
                                    if(err){
                                        console.log(err)
                                    }
                                    res.json({ success: "[+] Pelajaran berhasil di buat" })
                                })
                            })
                        }else{
                            res.json({ error: '[!] Soal sudah di buat' }).status(301)
                        }
                    })
                }
            })
        }
    })
})

route.post('/update/soal', (req,res) => {
    jwt.verify(req.body.token, req.body.secret, (err, token) => {
        if(err){
            req.json({ error: '[!] Wrong Authorization' }).status(301)
        }else{
            modelUsers.find({ username: token.username }, (err, users) => {
                if(err){
                    res.json({ error: '[!] Users not found' }).status(301)
                }else{
                    modelUlangan.updateMany({ pelajaran: req.body.pelajaran }, {
                        $push: {
                            soal: {
                                soal: req.body.soal,
                                jawaban: req.body.jawaban
                            },
                        }
                    }, (err, done) => {
                        res.json({ success: "[+] Success updating soal" })
                    })
                }
            })
        }
    })
})

route.post('/update/pilihan', (req,res) => {
    jwt.verify(req.body.token, req.body.secret, (err, token) => {
        if(err){
            req.json({ error: '[!] Wrong Authorization' }).status(301)
        }else{
            modelUsers.find({ username: token.username }, (err, users) => {
                if(err){
                    res.json({ error: '[!] Users not found' }).status(301)
                }else{
                    modelUlangan.findOneAndUpdate({
                        pelajaran: req.body.pelajaran,
                        "soal.soal": req.body.soal
                    },{
                        $push: {
                            "soal.$.opsi": {
                                soal: req.body.soal,
                                judul: req.body.judul,
                                pilihan: req.body.pilihan
                            }
                        }
                    }, (err, done) => {
                        res.json({ success: "[+] Success updating opsi" })
                    })
                }
            })
        }
    })
})

route.post('/update/jawab', (req,res) => {
    jwt.verify(req.body.token, req.body.secret, (err, token) => {
        if(err){
            res.json({ error: '[!] Wrong Authorization' }).status(301)
        }else{
            modelUsers.find({ username: req.body.username }, (err, users) => {
                if(err){
                    res.json({ error: '[!] Users not found' }).status(301)
                }

                // some code here...
            })
        }
    })
})


module.exports = route
