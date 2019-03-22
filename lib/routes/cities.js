let express = require('express')
let router = express.Router()
// let helper = require('../helper')
let City = require('../city-request')
let Category = require('../category-request')

// CREATE A CITY
router.post('/', (req, res) => {
  if (!req.body) return res.status(400).send('Body is missing')
  City.createCity(req.body, function (err, result) {
    if (err || !result) res.status(500).send({ error: err.toString() })
    console.info(`City ${result.city_name} created`)
    res.send(result)
  })
})

// READ ALL CITIES
router.get('/', (req, res) => {
  console.info('All cities requested')

  City.getCities(function (err, result) {
    if (err || !result) res.status(500).send({ error: err.toString() })
    res.send(result)
  })
})

// UDATE A CITY NAME
router.put('/:city_id', (req, res) => {
  if (!req.params.city_id) return res.status(400).send('Needs a name')

  City.updateCity(req.params.city_id, req.body, function (err, result) {
    if (err || !result) res.status(500).send({ error: err.toString() })
    console.info(`New city name: ${result.city_id}`)
    res.status(200).send(result)
  })
})

// DELETE A CITY
router.delete('/:city_id', (req, res) => {
  if (!req.params.city_id) return res.status(400).send('Needs a name')
  City.deleteCity(req.params.city_id, function (err, result) {
    if (err || !result) res.status(500).send({ error: err.toString() })
    console.info(`City ${req.params.city_id} deleted`)
    res.status(200).send(result)
  })
})

// CREATE A CATEGORY FOR CITY
router.post('/:city_id/categories', (req, res) => {
  if (!req.body) return res.status(400).send('Body is missing')
  console.log('req', req.body)
  Category.createCategoryForCity(req.params.city_id, req.body, function (
    err,
    result
  ) {
    if (err || !result) res.status(500).send({ error: err.toString() })
    console.info(`Category ${result} created`)
    res.send(result)
  })
})

// DELETE A CATEGORY FOR CITY
router.delete('/:city_id/categories/:cat_id', (req, res) => {
  if (!req.params.city_id || !req.params.cat_id) return res.status(400).send('Needs a name')
  Category.deleteCategoryForCity(req.params.city_id, req.params.cat_id, function (err, result) {
    if (err || !result) res.status(500).send({ error: err.toString() })
    console.info(`Category ${req.params.cat_id} for city ${req.params.city_id} deleted`)
    res.status(200).send(result)
  })
})

// UPDATE A CATEGORY FOR CITY
router.put('/:city_id/categories/:cat_id', (req, res) => {
  if (!req.params.city_id || !req.params.cat_id) return res.status(400).send('Needs a name')
  Category.updateCategoryForCity(req.params.city_id, req.params.cat_id, req.body, function (err, result) {
    if (err || !result) res.status(500).send({ error: err.toString() })
    else {
      console.info(`Category ${req.params.cat_id} for city ${req.params.city_id} updated`)
      res.status(200).send(result)
    }
  })
})

// READ A CITY WITH ALL CATEGORIES
// router.get('/:city_id', (req, res) => {
//     if (!req.params.city_id) return res.status(400).send("Needs a name");

//     let cityId = req.params.name;
//     console.info(`Requested city: ${cityName}`)

//     City.getCityByName(cityId, function(err, result){
//         if (err || !result) res.status(500).send({ error: err.toString() })
//         res.send(result)
//     })
// })

module.exports = router
