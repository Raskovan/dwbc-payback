let CityModel = require('../models/city_model')

function City () {}

// READ
City.prototype.getCities = function (callback) {
  return CityModel.find({ }, callback)
}

// CREATE
City.prototype.createCity = function (cityName, callback) {
  let model = new CityModel(cityName)
  return model.save(callback)
}

// DELETE
City.prototype.deleteCity = function (cityId, callback) {
  return CityModel.findOneAndDelete(
    { _id: cityId },
    callback
  )
}

// UPDATE
City.prototype.updateCity = function (cityId, newNameObj, callback) {
  return CityModel.findByIdAndUpdate(
    cityId,
    { $set: newNameObj, $inc: { __v: 1 } },
    { new: true },
    callback
  )
}

module.exports = new City()
