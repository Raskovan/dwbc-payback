let mongoose = require('mongoose')

let uristring = process.env.MONGODB_URI || 'mongodb://localhost:27017/dwbcpay';

mongoose.connect(uristring, { useNewUrlParser: true })
mongoose.set('useCreateIndex', true)
mongoose.set('useFindAndModify', false)

let CitySchema = new mongoose.Schema({
  city_name: {
    type: String,
    required: true,
    unique: true
  },
  categories: [{
    category_name: String,
    category_price: Number,
    type_of: String,
    order: Number,
    items: [{
      item_name: String,
      item_price: Number
    }]
  }]
})

module.exports = mongoose.model('cities', CitySchema)
