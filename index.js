const express = require('express')
const server = express()
const mongoose = require('mongoose')
const healthroutes = require('./routes/healthroutes')


mongoose.connect('mongodb+srv://amaljithmk123:123321123@cluster0.k1uhmmt.mongodb.net/health', {
    useNewUrlParser: true,
    useUnifiedTopology: true,

}).then(() => {
    console.log('Database Connected')
})
    .catch((err) => {
        console.log(err)
    })

server.use(express.json())
server.use(express.urlencoded({ extended: true }))


server.set('view engine', 'ejs')

server.use(express.static('./public'))

server.use('/api/health', healthroutes)


server.get('/home', (req, res) => {
    res.render('home')
})
server.get('/add', (req, res) => {
    res.render('add')
})
server.get('/view', (req, res) => {
    res.render('view')
})



const port = 2222;
server.listen(port, () => {
    console.log(`Server Started on ${port}`)
})