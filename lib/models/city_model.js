let mongoose = require('mongoose')

let CitySchema = new mongoose.Schema({
  city_name: {
    type: String,
    required: true
  },
  categories: [
    {
      category_name: {
        type: String,
        required: true
      },
      category_price: {
        type: Number,
        default: null
      },
      type_of: String,
      order: Number,
      items: [
        {
          item_name: String,
          item_price: Number
        }
      ]
    }
  ],
  updated: { type: Date, default: Date.now }
})

module.exports = mongoose.model('City', CitySchema)
