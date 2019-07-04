const app = require('express')()
const consign = require('consign')
const mongoose = require('mongoose')

require('./config/mongodb')

app.db = require('./config/db')
app.mongoDb = mongoose

consign()
    .include('./config/passport.js')
    .then('./config/middlewares.js')
    .then('./api/validation.js')
    .then('./api')
    .then('./schedule')
    .then('./config/routes.js')
    .into(app)

app.listen(3000, () => console.log('backend executando na porta 3000'))