const express = require('express')
const app = express()
const routes = require('./routes')
const path = require('path')

app.set('view engine', 'ejs')

//localizar views
app.set('views', path.join(__dirname, 'views'))

app.use(express.static('public'))

app.use(express.urlencoded({ extended : true }))

//app.use((req, res) => {res.status(400).send('OPS! essa pagina não existe! (erro 404)')})

app.use(routes)
