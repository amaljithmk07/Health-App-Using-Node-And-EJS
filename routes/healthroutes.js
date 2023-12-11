const express = require('express')
const healthroutes = express.Router()

const health = require('../models/healthschema')


// add

healthroutes.post('/add', (req, res) => {
    const Data = new health({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        gender: req.body.gender,
        date_of_birth: req.body.date_of_birth,
        phone_number: req.body.phone_number,
        address: req.body.address,

    })
    Data.save()
        .then((data) => {
            res.redirect('/api/health/view')
            //     // res.status(200).json({
            //     //     success: true,
            //     //     error: false,
            //     //     message: data,
            //     // })
        })
        .catch((err) => {
            res.send(err)
        })
});



// list


healthroutes.get('/list/:id', (req, res) => {
    health.findOne({
        _id: req.params.id
    })
        .then((data) => {
            res.render('update', { data })

            // res.send(data)
        })
        .catch((err) => {
            res.send(err)
        })
});



// view One


healthroutes.get('/view/:id', (req, res) => {
    health.findOne({
        _id: req.params.id
    })
        .then((data) => {
            res.render('viewone', { data })

            // res.send(data)
        })
        .catch((err) => {
            res.send(err)
        })
});




// view


healthroutes.get('/view', (req, res) => {
    health.find()
        .then((data) => {
            res.render('view', { details: data })

            // res.send(data)
        })
        .catch((err) => {
            res.send(err)
        })
});


//update

healthroutes.post('/update/:id', (req, res) => {
    health.findOne({
        _id: req.params.id
    })
        .then((data) => {
            data.first_name = req.body.first_name,
                data.last_name = req.body.last_name,
                data.gender = req.body.gender,
                data.date_of_birth = req.body.date_of_birth,
                data.phone_number = req.body.phone_number,
                data.address = req.body.address,
                data.save()
                    .then((data) => {
                        res.redirect('/api/health/view')
                        // res.send(data)
                    })
                    .catch((err) => {
                        res.send(err)
                    })
        })
})


//delete

healthroutes.get('/delete/:id', (req, res) => {
    health.deleteOne({
        _id: req.params.id
    })
        .then((data) => {
            res.redirect('/api/health/view')
            // res.send('Deleted Successfully')
        })
        .catch((err) => {
            res.send(err)
        })
})

module.exports = healthroutes