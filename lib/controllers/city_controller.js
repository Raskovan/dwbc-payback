let async = require('async')
let CityModel = require('../models/city_model')
let CityListModel = require('../models/city_list_model')

function City () {}

// READ EVERYTHING
City.prototype.getCities = function (callback) {
  CityModel.find({ }, callback)
}

// GET A CITY
City.prototype.getCity = function (cityId, callback) {
  CityModel.find({ _id: cityId }, callback)
}

// CREATE
City.prototype.createCity = function (cityName, callback) {
  async.waterfall([
    function (cb) {
      let model = new CityModel(cityName)
      return model.save(cb)
    },
    function (cityRes, cb) {
      let cityListModel = new CityListModel({ city_name: cityRes.city_name, city_id: cityRes._id })
      cityListModel.save(function (err, result) {
        cb(err, result)
      })
    }
  ], callback)
}

// DELETE
City.prototype.deleteCity = function (cityId, callback) {
  async.waterfall([
    function (cb) {
      CityModel.findOneAndDelete({ _id: cityId }, cb)
    },
    function (result, cb) {
      CityListModel.findOneAndDelete({ city_id: cityId }, function (err, resultList) {
        cb(err, result)
      })
    }
  ], callback)
}

// UPDATE
City.prototype.updateCity = function (cityId, newObj, callback) {
  async.waterfall([
    function (cb) {
      CityModel.findByIdAndUpdate(
        cityId,
        { $set: newObj, $inc: { __v: 1 } },
        { new: true },
        cb
      )
    },
    function (result, cb) {
      if (newObj.city_name) {
        CityListModel.findOneAndUpdate(
          { city_id: cityId },
          { $set: newObj },
          function (err, resultList) {
            cb(err, result)
          }
        )
      } else {
        cb(null, result)
      }
    }
  ], callback)
}

// READ CITY LIST
City.prototype.getCityList = function (callback) {
  CityListModel.find({}, callback)
}

module.exports = new City()
