const db = require('mongoose')

const skema = db.Schema({
    jurusan: { type: String }
}, { collection: 'jurusan' })

module.exports = db.model('jurusan', skema)
