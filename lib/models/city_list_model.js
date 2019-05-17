let mongoose = require('mongoose')
var ObjectId = mongoose.Schema.Types.ObjectId

let CityListSchema = new mongoose.Schema({
  city_name: String,
  city_id: ObjectId
});

module.exports = mongoose.model('CityList', CityListSchema)
