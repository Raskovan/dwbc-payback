let CityModel = require('../models/city_model')

function City () {}

// READ
City.prototype.getCities = function (callback) {
  CityModel.find({ }, function (err, allCities) {
    if (err) return callback(err)
    if (allCities) {
      return callback(null, allCities)
    } else {
      return callback(
        new Error(`No cities to show`)
      )
    }
  })
}

// CREATE
City.prototype.createCity = function (cityName, callback) {
  let model = new CityModel(cityName)
  model.save()
    .then(result => {
      if (!result || result.length === 0) return callback(new Error('Empty body'))
      return callback(null, result)
    })
    .catch(err => { return callback(err) })
}

// DELETE
City.prototype.deleteCity = function (cityId, callback) {
  let query = { _id: cityId }
  CityModel.findOneAndDelete(query, function (err, result) {
    if (err) return callback(err)
    if (result) {
      return callback(null, result)
    } else {
      return callback(new Error(`No city to delete`))
    }
  })
}
// UPDATE
City.prototype.updateCity = function (cityId, newNameObj, callback) {
  let query = { _id: cityId }
  console.info(`Updating city id: ${cityId}`)
  CityModel.findByIdAndUpdate(cityId, { $set: newNameObj }, { new: true }, function (err, result) {
    if (err) return callback(err)
    if (result) {
      return callback(null, result)
    } else {
      return callback(new Error(`City can't be found`))
    }
  })
}

module.exports = new City()
