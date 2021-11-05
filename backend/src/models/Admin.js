let mongoose = require('mongoose')


let Admin = new mongoose.Schema({
    menu: { type: String },
    icons: { type: String }
}, { collections: 'admin' })

module.exports = mongoose.model('admin', Admin)
