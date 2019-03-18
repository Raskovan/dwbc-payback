let express = require('express');
let router = express.Router()
let CategoryModel = require('../models/categories')

router.post('/city', (req, res) => {
    if (!req.body) {
        return res.status(400).send('No body.')
    }
})

router.get('/category', (req, res) => {
    CategoryModel.find({})
        .then(doc => {
            res.json(doc)
        })
        .catch(err => {
            res.status(500).json(err)
        })
})

module.exports = router;