let express = require('express');
let router = express.Router()
let Cat = require("../category-request");
let City = require("../city-request");
let async = require('async');

//READ ALL CATEGORIES
router.get('/', (req, res) => {
    Cat.getAllCats(function (err, result) {
        if (err || !result) res.status(500).send({ error: err.toString() })
        res.send(result)
    })
})

//UPDATE A CATEGORY FOR CITY
router.put('/:name/:cat', (req, res) => {
    if (Object.entries(req.body).length === 0) {
      res.status(400).send("Body is missing");
      return;
    } 
        async.waterfall([
            function (callback) {
                City.getCity(req.params.name, function (err, cityObj) {
                    if (err || !cityObj) callback(err, null)
                    else callback(null, cityObj);
                });
            },
            function (cityObj, callback) {
                let query = { city_id: cityObj._id, category_name: req.params.cat }
                Cat.updateCategory(query, req.body, function (err, result) {
                    if (err || !result) callback(err, null)
                    else callback(null, result);
                })
            }
        ],
            function (err, result) {
                if (err) res.status(404).send({ error: err.toString() });
                else {
                console.info(`Category ${req.params.cat} for city ${req.params.name} updated`);
                res.send(result)}
            });
        
})

//CREATE A CATEGORY FOR CITY
router.post('/:name', (req, res) => {
    if (!req.body && !req.params.name) return res.status(400).send("Body is missing");

    async.waterfall([
        function(callback){
            City.getCity(req.params.name, function(err, result) {
                if (err || !result) callback(err, null)
                else callback(null, result);
            });
        },
        function(result, callback){
            req.body.city_id = result._id;
            Cat.createCatForCity(req.body, function (err, result) {
                if (err || !result) callback(err, null)
                else callback(null, result);
            })
        }
    ],
    function(err, result){
        if (err) res.status(500).send({ error: err.toString() }); 
        console.info(`Category ${req.body.category_name} for city ${req.params.name} created`);
        res.send(result)
    });
})

module.exports = router;