let mongoose = require('mongoose')

let CitySchema = new mongoose.Schema({
  city_name: {
    type: String,
    required: true,
    unique: true
  },
  categories: [{
    category_name: String,
    category_price: {
      type: Number,
      default: null
    },
    type_of: String,
    order: Number,
    items: [{
      item_name: String,
      item_price: Number
    }]
  }]
})

module.exports = mongoose.model('City', CitySchema)
