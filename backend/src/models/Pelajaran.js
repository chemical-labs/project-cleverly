const db = require('mongoose')


const skema = db.Schema({
    jurusan: { type: String },
    nama: { type: String },
    gambar: { type: String }
}, { collection: 'pelajaran' })

module.exports = db.model("pelajaran", skema)
