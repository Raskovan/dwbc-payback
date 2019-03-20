let express = require('express');
let router = express.Router();
let helper = require('../helper');
let City = require('../city-request');

//READ ALL CITIES
router.get('/all', (req, res) => {
    console.info("All cities requested")

    City.getAllCities(function(err, result) {
        if (err || !result) res.status(500).send({ error: err.toString() })
        res.send(result)
    });
})

//CREATE A CITY
router.post('/', (req, res) => {
    if (!req.body) return res.status(400).send("Body is missing");
    City.createCity(req.body, function(err, result){
        if (err || !result) res.status(500).send({ error: err.toString() })
        console.info(`City ${result.city_name} created`);
        res.send(result)
    })
})

//READ A CITY WITH ALL CATEGORIES
router.get('/:name', (req, res) => {
    if (!req.params.name) return res.status(400).send('Needs a name');

    let cityName = req.params.name;
    console.info(`Requested city: ${cityName}`)
    
    City.getCityByName(cityName, function(err, result){
        if (err || !result) res.status(500).send({ error: err.toString() })
        res.send(result)
    })
})

//UDATE A CITY NAME
router.put('/:name', (req, res) => {
    if (!req.params.name) return res.status(400).send("Needs a name");

    City.updateCity(req.params.name, req.body, function(err, result) {
      if (err || !result) res.status(500).send({ error: err.toString() });
        console.info(`New city name: ${result.city_name}`);
        res.status(200).send(result);
    });
}) 

//DELETE A CITY
router.delete('/:name', (req, res) => {
    if (!req.params.name) return res.status(400).send("Needs a name");
    City.deleteCity(req.params.name, function(err, result) {
      if (err || !result) res.status(500).send({ error: err.toString() });
      console.info(`City ${req.params.name} deleted`);
      res.status(200).send(result);
    });
}) 


module.exports = router;