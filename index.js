const express = require('express')
const bodyParser = require('body-parser')
const routes  = require('./src/rotas')
const mysql = require('mysql2')

const app = express()
const port = 3000
app.use(bodyParser.json())
routes(app)

app.listen(port, () => { console.log(`Server rodando na porta ${port}`)})
