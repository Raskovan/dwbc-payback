let CityModel = require("./models/city-model");

function City(){}

City.prototype.getCityByName = function(cityName, callback){
    if(!cityName) return callback(new Error('No city provided'));

    CityModel.findOne({city_name: cityName}, function(err, result){
        if (err) return callback(err);
        if (result){
            CityModel.aggregate(
                [{ $match: { city_name: cityName } },
                { $lookup: { from: "categories", localField: "_id", foreignField: "city_id", as: "categories" } }]
            )
                .then(res => { 
                    let formatRes = res[0].categories
                    return callback(null, formatRes); 
                })
                .catch(err => { return callback(err) });
        } else {
            return callback(new Error('No such city'));
        }
    })
}

module.exports = new City();