let CityModel = require('./models/city-model')

function City () {}

// City.prototype.getCityByName = function (cityName, callback) {
//   if (!cityName) return callback(new Error('No city provided'))

//   CityModel.findOne({ city_name: cityName }, function (err, cityObj) {
//     if (err) return callback(err)
//     if (cityObj) {
//       Category.getCategoriesForCity(cityObj, function (err, result) {
//         if (err || !result) return callback(err)
//         return callback(null, result)
//       })
//     } else {
//       return callback(new Error(`We don't serve ${cityName} yet, come back later`))
//     }
//   })
// }
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

// City.prototype.getCity = function (cityName, callback) {
//   CityModel.findOne({ city_name: cityName }, function (err, cityObj) {
//     if (err) return callback(err)
//     if (cityObj) {
//       return callback(null, cityObj)
//     } else {
//       return callback(new Error(`No city found`))
//     }
//   })
// }

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
  CityModel.findOneAndUpdate(query, { $set: newNameObj }, { new: true }, function (err, result) {
    if (err) return callback(err)
    if (result) {
      return callback(null, result)
    } else {
      return callback(new Error(`City can't be found`))
    }
  })
}

module.exports = new City()
