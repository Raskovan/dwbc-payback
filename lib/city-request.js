let CityModel = require("./models/city-model");
let Category = require("./category-request");

function City(){}

City.prototype.getCityByName = function(cityName, callback){
    if(!cityName) return callback(new Error('No city provided'));

    CityModel.findOne({city_name: cityName}, function(err, cityObj){
        if (err) return callback(err);
        if (cityObj){
            Category.getCategoriesForCity(cityObj, function (err, result) {
                if (err || !result) return callback(err)
                return callback(null, result);
            })  
        } else {
            return callback(new Error(`We don't serve ${cityName} yet, come back later`));
        }
    })
}

City.prototype.getAllCities = function (callback) {
    CityModel.find({ }, function (err, allCities) {
        if (err) return callback(err);
        if (allCities) {
            return callback(null, allCities);
        } else {
          return callback(
            new Error(`No cities to show`)
          );
        }
    })
}

City.prototype.getCity = function(cityName, callback) {
    CityModel.findOne({ city_name: cityName }, function(err, cityObj) {
        if (err) return callback(err);
        if (cityObj) {
            return callback(null, cityObj);
        } else {
        return callback(new Error(`No city found`));
        }
  });
};

City.prototype.createCity = function(cityName, callback) {
    let model = new CityModel(cityName)
    model.save()
        .then(result => {
            if (!result|| result.length === 0) return callback(new Error("Empty body"))
            return callback(null, result);
        })
        .catch(err => { return callback(err) })
}

City.prototype.deleteCity = function(cityName, callback) {
    let query = { city_name: cityName };
    CityModel.findOneAndDelete(query, function(err, result) {
      if (err) return callback(err);
      if (result) {
        return callback(null, result);
      } else {
        return callback(new Error(`No city to delete`));
      }
    });
}

City.prototype.updateCity = function(cityName, newNameObj, callback) {
    let query = { city_name: cityName };
    console.info(`Updating city name: ${cityName}`);
    CityModel.findOneAndUpdate(query, {$set: newNameObj}, {new: true}, function(err, result) {
      if (err) return callback(err);
      if (result) {
        return callback(null, result);
      } else {
        return callback(new Error(`City can't be found`));
      }
    });
}

module.exports = new City();