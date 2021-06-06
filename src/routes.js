const express = require('express')
const routes = express.Router()
const profileController = require('./controllers/profileController')
const jobController = require('./controllers/jobController')
const dashboard = require('./controllers/DashboradController')


//routes.use((req, res, next) => res.status(404).send('eita!'))
routes.get('/', dashboard.index )
routes.get('/job', jobController.create)
routes.post('/job', jobController.save)
routes.get('/job/:id', jobController.show)
routes.post('/job/:id', jobController.update)
routes.post('/job/delete/:id', jobController.delete)
routes.get('/profile', profileController.index)
routes.post('/profile', profileController.update)
routes.get('/easteregg', (req,res) => {res.sendFile(__dirname + '/views/test.html')})


module.exports = routes