let express = require('express');
let router = express.Router();
let nconf = require('nconf');
let async = ('async')
let config = nconf.get('ROUTES');
let City = require('../city-request');
let CityModel = require('../models/city-model')

router.get('/all', (req, res) => {
    CityModel.aggregate([
        {
            $lookup:
            {
                from: "categories",
                localField: "_id",
                foreignField: "city_id",
                as: "categories"
            }
        }
    ])
    .then(doc => {
        res.json(doc)
    })
    .catch(err => {
        res.status(500).json(err)
    })
})

router.get('/:name', (req, res) => {

    if (!req.params.name) return res.status(400).send('Needs a name');
    let cityName = req.params.name;
    console.log(`Requested ${cityName}`)

    if (config.API_KEY) {
        if (!req.query.apikey) {
            return res.status(401).send("Not authorized");
        }
        let authorized = false;

        if (config.API_KEY && req.query.apikey === config.API_KEY) authorized = true;

        if (!authorized) return res.status(403).send("Forbidden");
    }

    City.getCityByName(cityName, function(err, result){
        if (err || !result) res.status(500).send({ error: err.toString() })
        res.send(result)
    })
})

// router.post('/api/v1/city', (req, res) => {
//     if (!req.body) res.status(400).send("Body is missing");

//     let model = new CityModel(req.body)
//     model.save()
//         .then (doc => {
//             if (!doc || doc.length === 0) return res.status(500).send(doc)
//             res.status(201).send(doc)
//         })
//         .catch(err => {
//             res.status(500).json(err)
//         })
// }) 

module.exports = router;