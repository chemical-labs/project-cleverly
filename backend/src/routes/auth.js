const express = require('express');
const route = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const model = require('../models/Users');

route.post('/user', (req,res) => {
    jwt.verify(req.body.token, req.body.secret, (err, token) => {
        res.json(token)
    })
})

route.post('/login', (req,res) => {
    model.find({ username: req.body.username }, (err, user) => {
        if(user.length == null){
            res.json({ error: '[!] Username or password is wrong' }).status(301)
        }else{
            try{
                bcrypt.compare(req.body.password, user[0].password, (err, done) => {
                    if(err){
                        res.json({ error: '[!] Username or password is wrong' }).status(301)
                    }else{
                        res.header({ token: jwt.sign({ username: user[0].username }, process.env.SECRET) })
                        res.json({ success: '[+] Successfully login' })
                    }
                })
            }catch(e){
                res.json({ error: '[!] Wrong Authorization' }).status(301)
            }
        }
    })
})

route.post('/register', (req,res) => {
    model.find({ username: req.body.username }, (err, user) => {
        if(user.length == null){
            res.json({ error: '[!] User already sign-up' }).status(301)
        }else{
            bcrypt.hash(req.body.password, 10, (err, pw) => {
                model.insertMany({
                    username: req.body.username,
                    password: pw,
                    nama: req.body.nama,
                    email: req.body.email,
                    sekolah: req.body.sekolah,
                    pendidikan: req.body.pendidikan
                    
                }, (err, done) => {
                    if(err){
                        res.json({ error: '[!] Something Error in server' }).status(501)
                    }else{
                        res.json({ success: '[+] Successfully create account' })
                    }
                })
            })
        }
    })
})

route.post('/profile', (req,res) => {
    jwt.verify(req.body.token, req.body.secret, (err, token) => {
        if(err){
            res.json({ error: '[!] Wrong Authorization' })
        }

        model.find({ username: token.username, name: token.name }, (err, user) => {
            if(err){
                res.json({ error: '[!] Users not found' })
            }

            model.find({ username: token.username, name: token.name }, (err, done) => {
                res.json(done[0])
            })
        })
    })
})



module.exports = route;

