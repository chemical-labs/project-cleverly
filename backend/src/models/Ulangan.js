const db = require('mongoose')

const opsi = db.Schema({
    selected: { type: Boolean, default: false },
    soal: { type: String },
    judul: { type: String },
    pilihan: { type: String }
})

const soal = db.Schema({
    soal: { type: String },
    opsi: [opsi],
    jawaban: { type: String },
    user_jawab: { type: String, default: null },
    point: { type: Number, default: null },
    total_point: { type: Number, default: null }
})

const skema = db.Schema({
    pelajaran: { type: String },
    soal: [soal],
    icons: { type: String },
    description: { type: String },
    waktu: { type: String }
}, { collection: 'ulangan' })

module.exports = db.model('ulangan', skema);
