// Common dependencies
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const db = require('mongoose')
const file = require('express-fileupload')
const ch = require('colors')

// include .env file
require('dotenv').config();

// adding routes
const routeAuth = require('./routes/auth')
const routeUlangan = require('./routes/ulangan')
const routePelajaran = require('./routes/pelajaran')
const routeJurusan = require('./routes/jurusan')

const middlewares = require('./middlewares');
const api = require('./api');

const app = express();

// Connecting to database
db.connect(process.env.DB, {
    useUnifiedTopology: true
}).then(() => {
    console.log(ch.green("[+] Successfully connecting to database"))
}).catch(e => {
    console.log(ch.red('[!] Error connecting to database'))
})

app.use(morgan('dev'));
app.use(helmet());
app.use(file())
app.use(cors());
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }))

app.use(express.static('public'))

app.use('/auth', routeAuth)
app.use('/ulangan', routeUlangan)
app.use('/pelajaran', routePelajaran)
app.use('/jurusan', routeJurusan)

app.get('/', (req, res) => {
  res.json({
    message: 'Wellcome To Cleverly Server 🦄'
  });
});

app.use('/api/v1', api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
