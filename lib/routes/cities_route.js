let express = require('express')
let router = express.Router()
let City = require('../controllers/city_controller')
let Category = require('../controllers/category_controller')
let Item = require('../controllers/item_controller')

// CREATE A CITY
router.post('/', (req, res) => {
  if (Object.keys(req.body).length === 0) {
    return res.status(400).send('Body is missing')
  }

  City.createCity(req.body, function (err, result) {
    if (err) {
      res.status(500).send({ error: err.toString() })
    } else {
      console.info(`City ${result.city_name} created`)
      res.send(result)
    }
  })
})

// READ ALL CITIES
router.get('/', (req, res) => {
  City.getCities(function (err, result) {
    if (err) {
      res.status(500).send({ error: err.toString() })
    } else {
      console.info('All cities requested')
      res.send(result)
    }
  })
})

// READ CITYLIST
router.get('/list', (req, res) => {
  City.getCityList(function (err, result) {
    if (err) {
      res.status(500).send({ error: err.toString() })
    } else {
      console.info('City List requested')
      res.send(result)
    }
  })
})

// GET A CITY
router.get('/:city_id', (req, res) => {
  City.getCity(req.params.city_id, function (err, result) {
    if (err) {
      res.status(500).send({ error: err.toString() })
    } else {
      console.info(`City ${result[0].city_name} requested`)
      res.send(result[0].categories)
    }
  })
})

// UDATE A CITY
router.put('/:city_id', (req, res) => {
  if (!req.params.city_id || Object.keys(req.body).length === 0) {
    return res.status(400).send('Needs a body')
  }

  City.updateCity(req.params.city_id, req.body, function (err, result) {
    if (err) {
      res.status(500).send({ error: err.toString() })
    } else {
      console.info(`City was updated: ${result.city_name}`)
      res.status(200).send(result)
    }
  })
})

// DELETE A CITY
router.delete('/:city_id', (req, res) => {
  if (!req.params.city_id) return res.status(400).send('Needs a name')
  City.deleteCity(req.params.city_id, function (err, result) {
    if (err) {
      res.status(500).send({ error: err.toString() })
    } else if (result) {
      console.info(`City ${result.city_name} deleted`)
      res.status(200).send(result)
    } else {
      res.status(500).send('Something went horribly wrong....')
    }
  })
})

// CREATE A CATEGORY FOR CITY
router.post('/:city_id/categories', (req, res) => {
  if (!req.params.city_id || Object.keys(req.body).length === 0) {
    return res.status(400).send('Body is missing')
  }
  Category.createCategoryForCity(req.params.city_id, req.body, function (err, result) {
    if (err) {
      res.status(500).send({ error: err.toString() })
    } else {
      console.info(`Category created`)
      res.send(result)
    }
  })
})

// DELETE A CATEGORY FOR CITY
router.delete('/:city_id/categories/:cat_id', (req, res) => {
  if (!req.params.city_id || !req.params.cat_id) {
    return res.status(400).send('Needs a name')
  }
  Category.deleteCategoryForCity(req.params.city_id, req.params.cat_id, function (err, result) {
    if (err) {
      res.status(500).send({ error: err.toString() })
    } else {
      console.info(`Category ${req.params.cat_id} for city ${result.city_name} deleted`)
      res.status(200).send(result)
    }
  })
})

// UPDATE A CATEGORY FOR CITY
router.put('/:city_id/categories/:cat_id', (req, res) => {
  if (
    !req.params.city_id ||
    !req.params.cat_id ||
    Object.keys(req.body).length === 0
  ) {
    return res.status(400).send('Needs params/body')
  }
  Category.updateCategoryForCity(req.params.city_id, req.params.cat_id, req.body, function (err, result) {
    if (err) {
      res.status(500).send({ error: err.toString() })
    } else {
      console.info(`Category ${req.params.cat_id} for city ${req.params.city_id} updated`)
      res.status(200).send(result)
    }
  })
})

// CREATE AN ITEM FOR CATEGORY FOR CITY
router.post('/:city_id/categories/:cat_id/items', (req, res) => {
  if (
    !req.params.city_id ||
    !req.params.cat_id ||
    Object.keys(req.body).length === 0
  ) {
    return res.status(400).send('Needs params/body')
  }

  Item.createItemForCategoryForCity(req.params.city_id, req.params.cat_id, req.body, function (err, result) {
    if (err) {
      res.status(500).send({ error: err.toString() })
    } else {
      console.info(`Item created`)
      res.send(result)
    }
  })
})

// DELETE AN ITEM FOE CATEGORY FOR CITY
router.delete('/:city_id/categories/:cat_id/items/:item_id', (req, res) => {
  if (!req.params.city_id || !req.params.cat_id || !req.params.item_id) {
    return res.status(400).send('Needs params')
  }

  Item.deleteItemForCategoryForCity(req.params.city_id, req.params.cat_id, req.params.item_id, function (err, result) {
    if (err) {
      res.status(500).send({ error: err.toString() })
    } else {
      console.info(`Item ${req.params.item_id} for category ${req.params.cat_id} deleted`)
      res.status(200).send(result)
    }
  })
})

// UPDATE A ITEM FOE CATEGORY FOR CITY
router.put('/:city_id/categories/:cat_id/items/:item_id', (req, res) => {
  if (
    !req.params.city_id ||
    !req.params.cat_id ||
    !req.params.item_id ||
    Object.keys(req.body).length === 0
  ) {
    return res.status(400).send('Needs a name')
  }

  Item.updateItemForCategoryForCity(req.params.city_id, req.params.cat_id, req.params.item_id, req.body, function (err, result) {
    if (err) {
      res.status(500).send({ error: err })
    } else {
      console.info(`Item ${req.params.item_id} for category ${req.params.cat_id} was updated`)
      res.status(200).send(result)
    }
  })
})

module.exports = router
